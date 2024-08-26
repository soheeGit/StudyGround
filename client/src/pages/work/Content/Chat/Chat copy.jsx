import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // React Router의 useParams 사용

const SERVER_URL = 'http://localhost:8005'; // 서버 URL

const Chat = () => {
  const { boardId } = useParams(); // URL에서 boardId를 가져옵니다.
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const newSocket = io(SERVER_URL, { path: '/socket.io' });
    setSocket(newSocket);

    // 방에 참여 시, 서버로부터 메시지를 수신합니다.
    newSocket.on('chat', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${data.userId}: ${data.message}`,
      ]);
    });

    // 이미지 수신 처리
    newSocket.on('image', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${data.userId}: [이미지] ${data.imageUrl}`,
      ]);
    });

    // 컴포넌트가 언마운트될 때 소켓 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleJoinRoom = async () => {
    try {
      // 방 정보 가져오기
      const response = await axios.get(`/chat/room/${boardId}`);
      if (response.data.board) {
        socket.emit('join', boardId);
      } else {
        console.error('보드 ID를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error(
        '방 참여 실패:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit('leave', boardId); // `boardId`를 사용하여 방을 나갑니다.
      socket.disconnect();
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        await axios.post(`/room/${boardId}/chat`, { chat: message });
        socket.emit('chat', { roomId: boardId, message });
        setMessage('');
      } catch (error) {
        console.error(
          '메시지 전송 실패:',
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendImage = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(
          `/chat/room/${boardId}/image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        socket.emit('image', {
          roomId: boardId,
          imageUrl: response.data.imageUrl,
        });
        setFile(null);
      } catch (error) {
        console.error(
          '이미지 전송 실패:',
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  // 컴포넌트가 처음 렌더링될 때 방에 참여
  useEffect(() => {
    if (boardId) {
      handleJoinRoom();
    }
  }, [boardId]);

  return (
    <div>
      <h1>채팅방</h1>
      <div>
        <input type="text" value={boardId} readOnly placeholder="방 ID" />
        <button onClick={handleLeaveRoom}>방 나가기</button>
      </div>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSendMessage}>전송</button>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSendImage}>이미지 전송</button>
      </div>
    </div>
  );
};

export default Chat;

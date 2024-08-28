import { useState, useEffect } from 'react';
import Chat from '../../Component/Chat';
import styled from 'styled-components';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

function Chating() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [socket, setSocket] = useState(null);
  const client = JSON.parse(localStorage.getItem('user'));
  const userId = client.user.uId;
  const { boardId } = useParams();

  const connectSocket = () => {
    if (!socket) {
      const newSocket = io.connect('http://localhost:5000/room', {
        path: '/socket.io',
        transports: ['websocket', 'polling'],
        withCredentials: true,
        reconnection: false, // 자동 연결 비활성화
      });
      setSocket(newSocket);
    }
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (userId && boardId && socket) {
      socket.emit('join', { room: boardId, userId });
      console.log(
        `Emitted 'join' to room namespace with room: ${boardId} and userId: ${userId}`
      );
      setShowChat(true);
    } else {
      setErrorMsg('Please enter a valid userId and boardId.');
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected to room namespace');
      });

      socket.on('connect_error', (error) => {
        console.error('Connection Error:', error);
      });

      return () => {
        socket.off('connect');
      };
    }
  }, [socket]);

  return (
    <ChatApp>
      {!showChat ? (
        socket ? (
          <ChatContainer onSubmit={joinRoom}>
            <ChatTitle>Team Chat</ChatTitle>
            <ChatInput
              type="text"
              placeholder="이름을 입력하세요"
              value={userId}
              onChange={(e) => {
                setErrorMsg('');
                /* setUsername(e.target.value);*/
              }}
            />
            <ChatInput
              type="text"
              placeholder="방 번호를 입력하세요"
              value={boardId}
              onChange={(e) => {
                setErrorMsg('');
                setRoomId(e.target.value);
              }}
            />
            <ErrorMessage>{errorMsg}</ErrorMessage>
            <ChatButton type="submit">참가하기</ChatButton>
          </ChatContainer>
        ) : (
          <ChatTitle onClick={connectSocket}>Team Chat</ChatTitle>
        )
      ) : (
        <Chat socket={socket} username={username} boardId={boardId} />
      )}
    </ChatApp>
  );
}

export default Chating;

const ChatApp = styled.div`
  background: #fff;
  color: #212121;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatContainer = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  width: 250px;
  margin-top: 70px;
  height: 90%;
`;

const ChatTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: black;
`;

const ChatInput = styled.input`
  height: 35px;
  margin: 7px 0;
  border: 2px solid steelblue;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 5px 0;
`;

const ChatButton = styled.button`
  width: 250px;
  height: 50px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  background: steelblue;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: rgb(35, 65, 89);
  }
  &:active {
    font-size: 0.8rem;
  }
`;

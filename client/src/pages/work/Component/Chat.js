// 채팅 메세지 방
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Message } from './Message';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import teamChatIcon from '../../../assets/talk.png';
import sendIcon from '../../../assets/send.png';
import chatImageIcon from '../../../assets/chatimage.png';
import '../Content/Chat/Chat.css';
import { useParams } from 'react-router-dom';

function Chat() {
  const inputRef = useRef();
  const fileInputRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const messageBottomRef = useRef(null);
  const client = JSON.parse(localStorage.getItem('user'));
  const userId = client?.user?.uId;
  const userName = client?.user?.uName;
  const { boardId } = useParams();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:5000/chat', {
      path: '/socket.io',
      transports: ['websocket'],
      withCredentials: true,
      reconnection: false, // 자동 연결 비활성화
    });

    socketInstance.on('connect', () => {
      console.log('Connected to chat namespace');
      socketInstance.emit('join', boardId);
      console.log('Joined room:', boardId, 'with userId:', userId);
      // 임시
      const joinMessage = {
        boardId,
        userId: 'system',
        message: `${userName}님이 들어왔습니다.`,
      };
      socketInstance.emit('send_message', joinMessage);
      setMessageList((list) => [...list, joinMessage]);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    // 메시지 수신
    socketInstance.on('receive_message', (data) => {
      console.log('Received message:', data);
      setMessageList((list) => [...list, data]);
    });

    // user 입장
    socketInstance.on('join', (data) => {
      const systemMessage = {
        boardId,
        userId,
        message: data.chat,
      };
      setMessageList((list) => [...list, systemMessage]);
    });

    // user 퇴장
    socketInstance.on('exit', (data) => {
      const systemMessage = {
        boardId,
        userId: 'system',
        message: data.chat,
      };
      setMessageList((list) => [...list, systemMessage]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.off('receive_message');
      socketInstance.off('join');
      socketInstance.off('exit');
      socketInstance.off('connect');
      socketInstance.disconnect();
    };
  }, [boardId, userId, userName]);

  useEffect(() => {
    messageBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  const handleSend = () => {
    const message = inputRef.current.value;
    if (message && socket) {
      const messageData = {
        id: uuidv4(), // 고유한 메시지 ID 추가
        boardId,
        userId,
        message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        author: userName,
      };

      console.log('Sending message:', messageData);
      socket.emit('send', messageData);
      setMessageList((list) => [...list, messageData]);
      inputRef.current.value = '';
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && socket) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const messageData = {
          id: uuidv4(), // 고유한 메시지 ID 추가
          boardId,
          userId,
          image: reader.result, // 이미지 데이터 추가
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          author: userName,
        };

        console.log('Sending image message:', messageData);
        socket.emit('send', messageData);
        setMessageList((list) => [...list, messageData]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <RoomContainer>
      <RoomHeader>
        <RoomTitle>
          <div className="chat-header">
            <img
              src={teamChatIcon}
              alt="Team Chat Icon"
              className="chat-icon"
            />
            <div className="chat-font">Team Chat</div>
          </div>
        </RoomTitle>
      </RoomHeader>
      <RoomBody>
        <MessageBox>
          {messageList.map((messageContent) =>
            messageContent.userId === 'system' ? (
              <SystemMessage key={uuidv4()}>
                {messageContent.message}
              </SystemMessage>
            ) : (
              <Message
                key={messageContent.id || uuidv4()} // 중복된 key 방지
                messageContent={messageContent}
                currentUserId={userId}
              />
            )
          )}
          <div ref={messageBottomRef} />
        </MessageBox>
      </RoomBody>
      <ChatInputBox>
        <ChatInput
          ref={inputRef}
          type="text"
          placeholder="Message."
          onKeyDown={handleKeyDown}
        />
        <ChatButton>
          <ChatIcon onClick={() => fileInputRef.current.click()}>
            <img
              src={chatImageIcon}
              alt="Chatimage Icon"
              className="chatimage-icon"
            />
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </ChatIcon>
          <ChatIcon onClick={handleSend}>
            <img src={sendIcon} alt="Send Icon" className="send-icon" />
          </ChatIcon>
        </ChatButton>
      </ChatInputBox>
    </RoomContainer>
  );
}

export default Chat;

const RoomContainer = styled.div`
  width: 100%;
  max-width: 650px;
  @media screen and (max-width: 550px) {
    width: 90%;
  }
  height: 440px;
`;

const RoomHeader = styled.div`
  height: 40px;
  border-radius: 6px 6px 0 0;
  position: relative;
`;

const RoomTitle = styled.p`
  margin: 0;
  display: block;
  padding: 0 1em 0 2em;
  font-weight: 700;
  line-height: 45px;
  margin-left: -38px;
  margin-top: 10px;
`;

const RoomBody = styled.div`
  height: 410px;
  border: 1px solid #c8c8c8;
  background: #fff;
  position: relative;
  margin-top: 10px;
`;

const MessageBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto; /* 기존 scroll에서 auto로 변경 */
  overflow-x: hidden; /* 가로 스크롤은 숨김 */
  padding-top: 5px;
  box-sizing: border-box; /* 테두리와 패딩을 포함한 전체 크기 설정 */
`;

const ChatInputBox = styled.div`
  height: 40px;
  border: 1px solid #c8c8c8;
  border-top: none;
  display: flex;
  border-radius: 0 0 6px 6px;
  align-items: center;
`;

const ChatInput = styled.input`
  height: 100%;
  flex: 85%;
  border: 0;
  padding: 0 0.7em;
  font-size: 1em;
  outline: none;
  background: transparent;
  color: #9f9f9f;
`;

const ChatButton = styled.div`
  display: flex;
  flex: 15%;
  height: 100%;
  background: transparent;
  outline: none;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;
`;

const ChatIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    height: 24px;
    width: 24px;
  }
  margin-right: 15px;
`;

const SystemMessage = styled.div`
  width: 100%;
  text-align: center;
  margin: 10px 0;
  font-size: 0.9em;
  color: #888;
  background: #f5f5f5;
  border-radius: 5px;
  padding: 5px;
`;

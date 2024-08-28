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
  const userId = localStorage.getItem('userId');
  const [socket, setSocket] = useState(null);
  const client = JSON.parse(localStorage.getItem('user'));
  const userName = client.user.uName;
  const { boardId } = useParams();

  useEffect(() => {
    const socketInstance = io('http://localhost:5000/chat', {
      path: '/socket.io',
      transports: ['websocket'],
      withCredentials: true,
    });

    socketInstance.on('connect', () => {
      console.log('Connected to chat namespace');
      socketInstance.emit('join', { boardId, userId });
      console.log(boardId, userId);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    socketInstance.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.off('receive_message');
      socketInstance.off('connect');
      socketInstance.disconnect();
    };
  }, [boardId, userId]);

  useEffect(() => {
    messageBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  const handleSend = () => {
    const message = inputRef.current.value;
    if (message && socket) {
      const messageData = {
        boardId,
        userId,
        message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        author: userName,
      };
      socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]); // Update the message list immediately
      inputRef.current.value = '';
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && socket) {
      const reader = new FileReader();
      reader.onloadend = () => {
        socket.emit('send_message', {
          boardId,
          userId,
          image: reader.result,
          time: new Date().toLocaleTimeString(),
          author: userName,
        });
      };
      reader.readAsDataURL(file); // Convert the file to a Base64 string
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default action (form submission)
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
            <div className="chat-font"> Team Chat </div>
          </div>
        </RoomTitle>
      </RoomHeader>
      <RoomBody>
        <MessageBox>
          {messageList.map((messageContent) => (
            <Message messageContent={messageContent} key={uuidv4()} />
          ))}
          <div ref={messageBottomRef} />
        </MessageBox>
      </RoomBody>
      <ChatInputBox>
        <ChatInput
          ref={inputRef}
          type="text"
          placeholder="Message."
          onKeyDown={handleKeyDown} // Add onKeyDown event listener here
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
  max-width: 620px;
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
  margin-left: -45px;
  margin-top: 10px;
`;

const RoomBody = styled.div`
  height: 420px;
  border: 1px solid #355463;
  background: #fff;
  position: relative;
  margin-top: 10px;
`;

const MessageBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 5px;
`;

const ChatInputBox = styled.div`
  height: 40px;
  border: 1px solid #355463;
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
`;

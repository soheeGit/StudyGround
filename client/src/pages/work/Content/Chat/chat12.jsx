import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import Chat from '../../Component/Chat';
import styled from 'styled-components';

// Connect to the room namespace
const socket = io.connect('http://localhost:8005/room', { path: '/socket.io' });

// Connect to the chat namespace
// const chatSocket = io('http://localhost:8005/chat', { path: '/socket.io' });

function Chating() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleUserJoined = (data) => {
      console.log('User Joined:', data.chat);
    };

    const handleUserLeft = (data) => {
      console.log('User Left:', data.chat);
    };

    // Confirm connection to the room namespace
    socket.on('connect', () => {
      console.log('Connected to room namespace');
    });

    // Confirm connection to the chat namespace
    // chatSocket.on('connect', () => {
    //   console.log('Connected to chat namespace');
    // });

    // Set up listener for room messages or notifications
    socket.on('userJoined', handleUserJoined);
    socket.on('userLeft', handleUserLeft);

    // Cleanup function to remove listeners
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('userJoined', handleUserJoined);
      socket.off('userLeft', handleUserLeft);
      // chatSocket.off('connect');
      // chatSocket.off('connect_error');
    };
  }, []);

  const joinRoom = (e) => {
    e.preventDefault();
    if (username && room) {
      socket.emit('join', { room, username });
      console.log(
        `Emitted 'join' to room namespace with room: ${room} and username: ${username}`
      );
      setShowChat(true);
    } else {
      setErrorMsg('사용자 이름과 입장할 방을 입력해주세요.');
    }
  };

  return (
    <ChatApp>
      {!showChat ? (
        <ChatContainer onSubmit={joinRoom}>
          <ChatTitle>Team Chat</ChatTitle>
          <ChatInput
            type="text"
            placeholder="사용할 이름을 입력해주세요"
            onChange={(e) => {
              setErrorMsg('');
              setUsername(e.target.value);
            }}
          />
          <ChatInput
            type="text"
            placeholder="입장할 방을 입력해주세요"
            onChange={(e) => {
              setErrorMsg('');
              setRoom(e.target.value);
            }}
          />
          <ErrorMessage>{errorMsg}</ErrorMessage>
          <ChatButton type="submit">입장</ChatButton>
        </ChatContainer>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </ChatApp>
  );
}

export default Chating;

const ChatApp = styled.div`
  background: #fff;
  color: #212121;
  display: grid;
  place-items: left;
`;

const ChatContainer = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid steelblue;
  border-radius: 6px;
  padding: 10px;
  width: 300px;
`;

const ChatTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: steelblue;
`;

const ChatInput = styled.input`
  height: 35px;
  margin: 7px;
  border: 2px solid steelblue;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  color: red;
  height: 10px;
  font-size: 0.8rem;
`;

const ChatButton = styled.button`
  width: 200px;
  height: 50px;
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  background: steelblue;
  color: #fff;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background: rgb(35, 65, 89);
    transition: all 0.5s;
  }
  &:active {
    font-size: 0.8rem;
  }
`;

// 방 들어가기
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import Chat from '../../Component/Chat';
import styled from 'styled-components';

const socket = io.connect('http://localhost:5000/room', {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

function Chating() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to room namespace');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    return () => {
      socket.off('connect');
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
      setErrorMsg('Please enter a username and room.');
    }
  };

  return (
    <ChatApp>
      {!showChat ? (
        <ChatContainer onSubmit={joinRoom}>
          <ChatTitle>Team Chat</ChatTitle>
          <ChatInput
            type="text"
            placeholder="이름을 입력하세요"
            onChange={(e) => {
              setErrorMsg('');
              setUsername(e.target.value);
            }}
          />
          <ChatInput
            type="text"
            placeholder="방 번호를 입력하세요"
            onChange={(e) => {
              setErrorMsg('');
              setRoom(e.target.value);
            }}
          />
          <ErrorMessage>{errorMsg}</ErrorMessage>
          <ChatButton type="submit">참가하기</ChatButton>
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ChatContainer = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid steelblue;
  border-radius: 6px;
  padding: 20px;
  width: 300px;
`;

const ChatTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: steelblue;
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
  transition: background 0.3s;
  &:hover {
    background: rgb(35, 65, 89);
  }
  &:active {
    font-size: 0.8rem;
  }
`;

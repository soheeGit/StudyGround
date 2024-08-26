// 채팅방 참여
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Message } from './Message';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import teamChatIcon from '../../../assets/talk.png';
import '../Content/Chat/Chat.css';

const socket = io.connect('http://localhost:5000/chat', {
  // 수정
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

function Chat({ username, boardId }) {
  const inputRef = useRef(); // 메시지 입력 필드에 대한 참조
  const [messageList, setMessageList] = useState([]); // 현재 채팅방의 메시지를 저장하는 상태
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const messageBottomRef = useRef(null); // 채팅 메시지 스크롤을 자동으로 최신 메시지로 이동시키기 위한 참조

  socket.on('connect_error', (err) => {
    // 수정
    console.error('WebSocket connection error:', err);
  });

  socket.on('disconnect', (reason) => {
    // 수정
    console.warn('WebSocket disconnected:', reason);
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(`/chat/room/${boardId}`);
        const data = await response.json();

        console.log('Fetched data:', data);

        if (Array.isArray(data.chats)) {
          setUserInfo(data.user);
          setMessageList(
            data.chats.map((chat) => ({
              room: boardId,
              author: chat.userId,
              message: chat.message,
              time: new Date(chat.createdAt).toLocaleTimeString(),
            }))
          );
        } else {
          console.error('Chats data is not an array:', data.chats);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, [boardId]);

  const sendMessage = async () => {
    const currentMsg = inputRef.current.value;
    if (currentMsg !== '') {
      const messageData = {
        room: boardId,
        author: username,
        message: currentMsg,
        time: new Date(Date.now()).toLocaleTimeString(),
      };
      try {
        await fetch(`/room/${boardId}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat: currentMsg }),
        });
        socket.emit('send_message', messageData); // 수정
        setMessageList((list) => [...list, messageData]);
        inputRef.current.value = '';
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      // 수정
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off('receive_message'); // 수정
    };
  }, []);

  useEffect(() => {
    messageBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        await fetch(`/chat/room/${boardId}/image`, {
          method: 'POST',
          body: formData,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
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
          {messageList.map((messageContent) => {
            return (
              <Message
                messageContent={messageContent}
                username={username}
                key={uuidv4()}
              />
            );
          })}
          <div ref={messageBottomRef} />
        </MessageBox>
      </RoomBody>
      <ChatInputBox>
        <ChatInput
          ref={inputRef}
          type="text"
          placeholder="Message."
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <ChatButton onClick={sendMessage}>▹</ChatButton>
        <ChatImageInput
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </ChatInputBox>
    </RoomContainer>
  );
}

export default Chat;

const RoomContainer = styled.div`
  width: 50%;
  max-width: 600px;
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
`;

const RoomBody = styled.div`
  height: 360px;
  border: 1px solid #355463;
  background: #fff;
  position: relative;
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
`;

const ChatInput = styled.input`
  height: 100%;
  flex: 85%;
  border: 0;
  padding: 0 0.7em;
  font-size: 1em;
  border-right: 1px dotted #355463;
  outline: none;
  background: transparent;
`;

const ChatButton = styled.button`
  border: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 15%;
  height: 100%;
  background: transparent;
  outline: none;
  font-size: 25px;
  transition: all 0.5s;
  color: lightgray;
  &:hover {
    background: steelblue;
    transition: all 0.5s;
  }
  &:active {
    background: darkblue;
    font-size: 0.5rem;
  }
`;

const ChatImageInput = styled.input`
  display: none;
`;

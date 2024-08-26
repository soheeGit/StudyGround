import React, { useEffect, useRef, useState } from 'react';
import { Message } from './Message';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import teamChatIcon from '../../../assets/talk.png';
import '../Content/Chat/Chat.css';

function Chat({ socket, username, room }) {
  const inputRef = useRef();
  const [messageList, setMessageList] = useState([]);

  const messageBottomRef = useRef(null);

  const sendMessage = async () => {
    const currentMsg = inputRef.current.value;
    if (currentMsg !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      inputRef.current.value = '';
    }
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    messageBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

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
            <div className="chat-font"> Team Chat</div>
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
    /* transition: all 0.5s; */
    font-size: 0.5rem;
  }
`;

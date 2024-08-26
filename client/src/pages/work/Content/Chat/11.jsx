// Chat 초기 세팅 (임시)
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import teamChatIcon from '../../../../assets/talk.png';
import sendIcon from '../../../../assets/send.png';
import chatImageIcon from '../../../../assets/chatimage.png';

// 서버 URL을 설정하세요. 예를 들어, 'http://localhost:3000'을 사용할 수 있습니다.
const socket = io('http://localhost:3000');

function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // 서버로부터 메시지를 수신
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  // 메시지 전송 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && username.trim()) {
      const timestamp = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      socket.emit('chat message', { username, text: message, timestamp });
      setMessage('');
    }
  };

  // Chat 디자인
  return (
    <div className="ChatApp">
      <div className="chat-header">
        <img src={teamChatIcon} alt="Team Chat Icon" className="chat-icon" />
        <div className="chat-font"> Team Chat</div>
      </div>
      <div className="chat-box">
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="chat-message">
              <div className="message-details">
                <span className="avatar">{msg.username[0]}</span>
                <div className="message-content">
                  <span className="username">{msg.username}</span>
                  <span className="timestamp">{msg.timestamp}</span>
                  <p className="text">{msg.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form className="chatform" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button type="submit" className="chat-button">
          <img
            src={chatImageIcon}
            alt="Chatimage Icon"
            className="chatimage-icon"
          />
        </button>

        <button type="submit" className="send-button">
          <img src={sendIcon} alt="Send Icon" className="send-icon" />
        </button>
      </form>
    </div>
  );
}

export default ChatPage;

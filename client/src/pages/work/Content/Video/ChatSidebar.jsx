import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';
import { RiSendPlaneFill } from 'react-icons/ri';

const ChatSidebar = ({
  newSocket,
  visible,
  roomId,
  user,
  onToggleChatSidebar,
}) => {
  const [message, setMessage] = useState('');
  const [chatMessage, setChatMessage] = useState();
  const [receiveMessages, setReceiveMessages] = useState([]);
  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  // 채팅 스크롤 auto
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 메세지 전송
  const onSendChatMessage = (e) => {
    e.preventDefault();
    const messageObject = {
      roomId,
      message,
      name: user.uName,
      userId: user.uId,
    };
    console.log(messageObject);
    newSocket.emit('message', messageObject);
    setMessage('');
  };

  // 메세지 get
  useEffect(() => {
    if (!newSocket) return;

    // 기존 리스너가 중복 등록되지 않도록 먼저 제거
    newSocket.off('message');

    newSocket.on('message', (data) => {
      console.log('get Chat Effect Rendering');
      console.log(data);
      setReceiveMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [newSocket]);

  useEffect(() => {
    scrollToBottom();
  }, [receiveMessages, visible]);
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 50); // transition 시간(0.5s)과 일치하게 설정
  }, [visible]);

  return (
    <Aside visible={visible}>
      <div className="content">
        <header>
          <h3>채팅</h3>
          <button onClick={onToggleChatSidebar}>
            <IoCloseSharp size="25" />
          </button>
        </header>
        <div className="chats">
          <div className="scroll">
            {receiveMessages.map((chat, index) => (
              <ChatStyled key={index}>
                <div className={user.uName === chat.sender ? 'right' : 'left'}>
                  <div className="talk">
                    <div className="name">
                      {user.uName === chat.sender ? '' : chat.sender}
                    </div>
                    <div className="message">
                      <div className="txt">{chat.message}</div>
                    </div>
                  </div>
                </div>
              </ChatStyled>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
        <MessageInput>
          <form onSubmit={onSendChatMessage}>
            <input
              type="text"
              value={message}
              onChange={onChangeMessage}
              placeholder="메세지를 입력하세요"
            />
            <button type="submit">
              <RiSendPlaneFill size="28" />
            </button>
          </form>
        </MessageInput>
      </div>
    </Aside>
  );
};
export default ChatSidebar;

const Aside = styled.aside`
  ${(props) =>
    props.visible
      ? css`
          width: 340px;
        `
      : css`
          width: 0px;
        `}
  display: flex;
  flex-direction: column;
  background: #212121;
  overflow: hidden;
  transition: width 0.5s;
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 8px solid #212121;
    border-radius: 15px;
    border-left-width: 4px;
    background: white;
    header {
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #efefef;
      button {
        display: flex;
        align-items: center;
        border: none;
        background: none;
        cursor: pointer;
        outline: none;
      }
      h3 {
        font-size: 20px;
        margin: 0;
      }
    }
    .chats {
      flex: 1;
      position: relative;
      overflow: auto;
      .scroll {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
`;

const MessageInput = styled.div`
  padding: 15px 20px;
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      width: 90%;
      border: 1px solid #f1f3f4;
      border-radius: 15px;
      background: #f1f3f4;
      padding: 10px;
      outline: none;
    }
    button {
      border: none;
      background: white;
      outline: none;
      cursor: pointer;
    }
  }
`;

const ChatStyled = styled.div`
  overflow: hidden;
  padding: 8px 0;
  .talk {
    position: relative;
    padding-top: 23px;
    .name {
      position: absolute;
      top: 2px;
      left: 0;
      font-size: 14px;
      line-height: 13px;
      vertical-align: top;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .message {
      overflow: hidden;
      display: inline-block;
      background-color: #f5f3f3;
      position: relative;
      z-index: 0;
      max-width: 100%;
      font-size: 14px;
      line-height: 1.33;
      word-break: break-word;
      word-wrap: break-word;
      vertical-align: bottom;
      .txt {
        margin: 10px 12px 9px;
        white-space: pre-wrap;
      }
    }
  }

  .left {
    padding-left: 7px;
    float: left;
    position: relative;
    max-width: 60%;
    .talk {
      box-sizing: border-box;
      padding-top: 23px;
      margin-left: 7px;
      .message {
        border-radius: 3px 16px 16px;
      }
    }
  }
  .right {
    float: right;
    .talk {
      float: right;
      margin: 0;
      padding: 0;
      text-align: right;
      .name {
        width: 0px;
      }
      .message {
        border-radius: 16px 16px 3px;
        text-align: left;
      }
    }
  }
`;

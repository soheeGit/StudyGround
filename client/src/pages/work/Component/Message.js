import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Message = (props) => {
  const { messageContent, currentUserId } = props;
  const [who, setWho] = useState('other');

  useEffect(() => {
    if (messageContent.userId === currentUserId) {
      setWho('user');
    } else {
      setWho('other');
    }
  }, [messageContent, currentUserId]);

  return (
    <MessageContainer who={who}>
      <MessageBody who={who}>
        <MessageText>{messageContent.message}</MessageText>
      </MessageBody>
      <MessageSub who={who}>
        <Time>{messageContent.time}</Time>
        <Author>{messageContent.author}</Author>
      </MessageSub>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ who }) => (who === 'user' ? 'flex-end' : 'flex-start')};
  padding: 10px;
  box-sizing: border-box;
`;

const MessageBody = styled.div`
  max-width: 550px;
  border-radius: 20px;
  color: white;
  display: inline-block;
  margin: 5px;
  padding: 10px;
  overflow-wrap: break-word;
  word-break: break-word;
  background-color: ${({ who }) => (who === 'user' ? '#5678F4' : '#ECECEC')};
  color: ${({ who }) => (who === 'user' ? 'white' : 'black')};
`;

const MessageText = styled.p`
  margin: 0;
`;

const MessageSub = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-top: 2px;
  margin-left: ${({ who }) => (who === 'user' ? '10px' : '0')};
  margin-right: ${({ who }) => (who === 'user' ? '0' : '10px')};
`;

const Time = styled.p`
  margin: 0;
  margin-right: 5px;
`;

const Author = styled.p`
  margin: 0;
  font-weight: bold;
`;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Message = (props) => {
  const { messageContent } = props;
  const [who, setWho] = useState('userName');

  useEffect(() => {
    if (messageContent.author === 'userName') {
      setWho('userName');
    } else {
      setWho('other');
    }
  }, [messageContent]);

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
  align-items: ${({ who }) => (who === 'userName' ? 'flex-start' : 'flex-end')};
  padding: 10px;
  box-sizing: border-box;
`;

const MessageBody = styled.div`
  max-width: 550px;
  border-radius: 15px;
  color: white;
  display: inline-block;
  margin: 5px;
  padding: 10px;
  overflow-wrap: break-word;
  word-break: break-word;
  background-color: ${({ who }) =>
    who === 'userName' ? '#e0e0e0' : '#5678F4'};
`;

const MessageText = styled.p`
  margin: 0;
`;

const MessageSub = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-top: 2px;
  margin-left: ${({ who }) => (who === 'userName' ? '0' : '10px')};
  margin-right: ${({ who }) => (who === 'userName' ? '10px' : '0')};
`;

const Time = styled.p`
  margin: 0;
  margin-right: 5px;
`;

const Author = styled.p`
  margin: 0;
  font-weight: bold;
`;

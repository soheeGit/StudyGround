import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Message = (props) => {
  const messageContent = props.messageContent;
  const username = props.username;
  const [who, setWho] = useState('me');
  useEffect(() => {
    username === messageContent.author ? setWho('me') : setWho('other');
  }, [props]);

  return (
    <MessageContainer who={who}>
      <div>
        <MessageBody who={who}>
          <MessageText>{messageContent.message}</MessageText>
        </MessageBody>
        <MessageSub who={who}>
          <Time>{messageContent.time}</Time>
          <Author>{messageContent.author}</Author>
        </MessageSub>
      </div>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  padding: 0 10px;
  box-sizing: border-box;
`;

const MessageBody = styled.div`
  min-height: 40px;
  max-width: 550px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  margin: 0 3px;
  padding: 2px 5px;
  overflow-wrap: break-word;
  word-break: break-all;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  background-color: ${({ who }) => (who === 'me' ? '#598da7' : '#2d617b')};
`;

const MessageText = styled.p`
  margin: 5px;
`;

const MessageSub = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: ${({ who }) => (who === 'me' ? 'flex-end' : 'flex-start')};
  margin-right: ${({ who }) => (who === 'me' ? '10px' : '')};
  margin-left: ${({ who }) => (who === 'me' ? '' : '10px')};
`;

const Time = styled.p`
  margin-top: 5px;
  margin-right: 5px;
`;

const Author = styled.p`
  margin-top: 5px;
  margin-left: 5px;
  font-weight: bold;
`;

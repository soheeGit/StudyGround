import './Video.css';
import WorkHeader from '../../WorkHeader';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Button } from '../../Component/Button';
import Meet from './Meet';
import {
  Navigate,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';

const VideoPage = () => {
  const { boardId } = useOutletContext();
  const navigate = useNavigate();
  const handleJoinMeet = () => {
    navigate(`/meet/${boardId}`);
  };

  return (
    <>
      <WorkHeader title="Video" />
      <Wrap>
        <JoinRoomBlock>
          <Title>Video Conference</Title>
          <Button
            name="입장"
            onClick={() => handleJoinMeet()}
            size={'150px'}
            color={'steelblue'}
          />
        </JoinRoomBlock>
      </Wrap>
    </>
  );
};
const Wrap = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: steelblue;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const JoinRoomBlock = styled.div`
  width: 300px;
  background: #fff;
  color: #212121;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30vh;
  border: 1px solid steelblue;
  border-radius: 6px;
`;
export default VideoPage;

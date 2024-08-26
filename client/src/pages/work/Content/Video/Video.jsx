import './Video.css';
import WorkHeader from '../../WorkHeader';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Button } from '../../Component/Button';
import Meet from './Meet';
import { Navigate, useNavigate } from 'react-router-dom';

const VideoPage = () => {
  const localVideoRef = useRef(null);
  const remoteVideosDivRef = useRef(null);
  const chatAreaRef = useRef(null);
  const messageInputRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [peerConnections, setPeerConnections] = useState({});
  const room = 'testRoom';
  const navigate = useNavigate();

  const handleJoinMeet = () => {
    navigate('/meet');
  };

  return (
    <>
      <WorkHeader title="Video" />
      <Button name="입장" onClick={() => handleJoinMeet()} />
    </>
  );
};
export default VideoPage;

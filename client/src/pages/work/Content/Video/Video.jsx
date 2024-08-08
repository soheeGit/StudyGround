import './Video.css';
import WorkHeader from '../../WorkHeader';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Button } from '../../Component/Button';

const VideoPage = () => {
  const localVideoRef = useRef(null);
  const remoteVideosDivRef = useRef(null);
  const chatAreaRef = useRef(null);
  const messageInputRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [peerConnections, setPeerConnections] = useState({});
  const room = 'testRoom';

  let newSocket = io('http://127.0.0.1:8080');
  useEffect(() => {
    // const newSocket = io('http://127.0.0.1:8000');
    setSocket(newSocket);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);
        newSocket.emit('joinRoom', { room });
      });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('userJoined', async (data) => {
        if (!peerConnections[data.user]) {
          const newPeerConnection = makeConnection();
          setPeerConnections((prev) => ({
            ...prev,
            [data.user]: newPeerConnection,
          }));

          const offer = await newPeerConnection.createOffer();
          await newPeerConnection.setLocalDescription(
            new RTCSessionDescription(offer)
          );
          socket.emit('offer', { offer, room });
        }
      });

      socket.on('offer', async (data) => {
        handleOffer(data);
      });

      socket.on('answer', async (data) => {
        handleAnswer(data);
      });

      socket.on('iceCandidate', async (data) => {
        handleIceCandidate(data);
      });
    }
  }, [socket, peerConnections]);

  const makeConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    });

    pc.addEventListener('icecandidate', handleIce);
    pc.addEventListener('addstream', handleAddStream);
    if (localStream) {
      pc.addStream(localStream);
    }
    return pc;
  };

  const handleIce = (event) => {
    if (event.candidate) {
      socket.emit('iceCandidate', { candidate: event.candidate, room });
    }
  };

  const handleAddStream = (event) => {
    const newRemoteStreamElem = document.createElement('video');
    newRemoteStreamElem.autoplay = true;
    newRemoteStreamElem.srcObject = event.stream;
    remoteVideosDivRef.current.appendChild(newRemoteStreamElem);
  };

  const handleOffer = async (data) => {
    const newPeerConnection = makeConnection();
    setPeerConnections((prev) => ({
      ...prev,
      [data.clientId]: newPeerConnection,
    }));

    await newPeerConnection.setRemoteDescription(
      new RTCSessionDescription(data.offer)
    );

    const answer = await newPeerConnection.createAnswer();
    await newPeerConnection.setLocalDescription(answer);

    socket.emit('answer', { answer, room });
  };

  const handleAnswer = async (data) => {
    const pc = peerConnections[data.clientId];
    if (pc.signalingState !== 'stable') {
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    }
  };

  const handleIceCandidate = async (data) => {
    const pc = peerConnections[data.clientId];
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  const sendMessage = () => {
    const message = messageInputRef.current.value;
    socket.emit('message', { room, message });
    chatAreaRef.current.value += `Me: ${message}\n`;
    messageInputRef.current.value = '';
  };
  return (
    <>
      <WorkHeader title="Video" />
      <div className="videoPage-wrapper">
        <h2>Rooms</h2>
        <div className="video-rooms-container">
          <div className="video-room-title">8월 4째주 정기회의</div>
          <div className="video-room-content">
            이번 주의 정기회의 입니다. 금일 20시까지 진행 예정입니다.
          </div>
          host : JAEHYEOK
        </div>
        <div id="room-controls">
          <Button name="방 생성" />
        </div>
      </div>
    </>
  );
};
export default VideoPage;

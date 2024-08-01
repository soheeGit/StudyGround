import { useOutletContext } from 'react-router-dom';
import io from 'socket.io-client';
import WorkHeader from '../../WorkHeader';

// const socket = io('http://localhost:3000');
let peerConnections = {}; // Key: clientId, Value: { peerConnection: RTCPeerConnection, iceCandidatesQueue: RTCIceCandidate[] }
const localVideo = document.getElementById('localVideo');
const remoteVideosDiv = document.getElementById('remoteVideos');
socket.on('userJoined', async (data) => {
  if (!peerConnections[data.user]) {
    peerConnections[data.user] = makeConnection();
  }
});

// offer를 받았을 때 실행된다
socket.on('offer', async (data) => {
  try {
    console.log('Received offer:', data);
    if (!peerConnections[data.clientId]) {
      peerConnections[data.clientId] = makeConnection();
    }
    const pc = peerConnections[data.clientId];

    if (pc.signalingState !== 'stable') {
      console.log('Signaling state is not stable, rolling back');
      await Promise.all([
        pc.setLocalDescription({ type: 'rollback' }),
        pc.setRemoteDescription(new RTCSessionDescription(data.offer)),
      ]);
    } else {
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
    }
    console.log('Set remote description (offer) successfully');

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    console.log('Created and set local description (answer)');

    socket.emit('answer', { answer, room });
    console.log('Sent answer');

    addPendingCandidates(data.clientId);
  } catch (error) {
    console.error('Error handling offer:', error);
  }
});

// RTCPeerConnection 객체로 peer connection을 다룰 수 있다. 이 클래스의 생성자는 하나의 RTCConfiguration 객체를 파라미터로 받는다.
// 이 객체는 주로 사용되는 ICE server에 대한 정보를 담는다.
function makeConnection() {
  const RTCConfig = {
    iceServers: [
      {
        urls: [
          // Google의 공개 STUN서버 : 클라이언트의 public ip주소를 반환한다.
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  };
  const peerConnection = new RTCPeerConnection(RTCConfig);
}

const Video = () => {
  const { boardId } = useOutletContext();
  const { myBoard } = useOutletContext();

  return (
    <>
      <WorkHeader title="Video" />
      <video id="localVideo"></video>
      <div id="remoteVideos"></div>
    </>
  );
};
export default Video;

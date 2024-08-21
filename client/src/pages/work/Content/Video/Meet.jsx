import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './Meet.css';
import styled from 'styled-components';
import FooterButtons from './FooterButtons';
import { useNavigate } from 'react-router-dom';
import UsersButton from './UsersButton';
import ChatSidebar from './ChatSidebar';
import JoinMeetModal from './JoinMeetModal';
import MeetGrid from './MeetGrid';

const SOCKET_SERVER_URL = 'http://localhost:8000';

const Meet = () => {
  const [users, setUsers] = useState([]);
  const [myPeerConnection, setMyPeerConnection] = useState();
  // LocalStorage의 id불러오기
  const client = JSON.parse(localStorage.getItem('user'));
  const user = client.user;
  const userId = client.user.uId;
  const userName = client.user.uName;
  const navigate = useNavigate();

  console.log(users);
  const peerConnections = useRef({}); // 모든 상대방의 peerConnection 저장 객체
  console.log(peerConnections);
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const roomId = 'newRoom';

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [muted, setMuted] = useState(false);
  const [videoDisabled, setVideoDisabled] = useState(false);
  // 방 입장 모달 토글 상태
  const [joinModalOpen, setJoinModalOpen] = useState(true);
  // 사이드바 토글 상태
  const [userSidebarOpen, setUserSidebarOpen] = useState(false);
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);

  const onToggleUserSidebar = () => {
    setUserSidebarOpen(!userSidebarOpen);
  };

  const onToggleChatSidebar = () => {
    setChatSidebarOpen(!chatSidebarOpen);
  };

  useEffect(() => {
    const onSocket = async () => {
      try {
        // 1. socket연결 및 getStream
        let newSocket = await io.connect(SOCKET_SERVER_URL, {
          transports: ['websocket'],
        });
        setSocket(newSocket);

        newSocket.on('connected', (socketId) => {
          console.log('Connected Success ! Your Socket Id : ', socketId);
          setSocketId(socketId);
        });

        const stream = await getMediaStream();
        if (stream) {
          const myStream = {
            clientId: newSocket.id,
            userId: userId,
            userName,
            stream,
          };
          setUsers([myStream]);
        }
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        let sendPC = createPeerConnection(newSocket, stream, true);
        setMyPeerConnection(sendPC);
        createSenderOffer({ newSocket, sendPC });

        // 2. room 입장(1개의 고정방 자동입장)
        newSocket.emit('joinRoom', {
          roomId: roomId,
          userId: userId,
          userName: userName,
        });

        newSocket.on('usersInRoom', (data) => {
          console.log('현재 방 참가자 목록 :', data.users[0]);
        });

        newSocket.on('offer', async (data) => {
          try {
            console.log('received offer : ', data);
            const receivePC = createPeerConnection(newSocket, stream, false);
            peerConnections.current[data.userId] = receivePC;

            await receivePC.setRemoteDescription(
              new RTCSessionDescription(data.description)
            );
            const answer = await receivePC.createAnswer();
            await receivePC.setLocalDescription(answer);

            newSocket.emit('answer', {
              roomId,
              description: answer,
              userName: userName,
              userId: newSocket.id,
            });
          } catch (error) {
            console.log('Error handling offer', error);
          }
        });

        newSocket.on('answer', async (data) => {
          if (data.clientId === newSocket.id) {
            return;
          }
          console.log('Received answer ; ', data);

          await sendPC.setRemoteDescription(
            new RTCSessionDescription(data.description)
          );
        });

        newSocket.on('iceCandidate', async (data) => {
          if (data.clientId === newSocket.id) {
            return;
          }
          console.log('Received ICE Candidate :', data);
          const pc = peerConnections.current[data.clientId];
          if (pc) {
            try {
              await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
            } catch (error) {
              console.error('Error adding received ice canddiate', error);
            }
          }
        });
      } catch (error) {
        console.log('catch error : ', error);
      }
    };
    onSocket();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('userJoined', (data) => {
      console.log(`${data.userName}님이 참가혔습니다.`, data);
      setUsers((prevData) => [...prevData, data]);
    });
  }, [socket]);

  const getMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log('Get Media Stream Success !', stream);
      return stream;
    } catch (error) {
      console.error('getUserMedia error :', error);
      alert('미디어 접근에 실패하였습니다 !');
      return null;
    }
  };

  const pc_config = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  };
  const createPeerConnection = (newSocket, stream, isSender) => {
    let pc = new RTCPeerConnection(pc_config);

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(
          `${isSender ? 'Sender' : 'Receiver'} PC onicecandidate Success!`
        );
        newSocket.emit('onicecandidate', {
          roomId: roomId,
          candidate: e.candidate,
          clientId: newSocket.id,
          userName: userName,
        });
      }
    };

    pc.onaddstream = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        console.log('get remoteVideo !', event);
      }
    };

    if (isSender && stream) {
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
      console.log('Success AddTrack !');
    } else {
      console.log('This is Receiver');
    }

    return pc;
  };

  const createSenderOffer = async ({ newSocket, sendPC }) => {
    try {
      let sdp = await sendPC.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });
      console.log('created offer Success!');
      await sendPC.setLocalDescription(new RTCSessionDescription(sdp));

      newSocket.emit('offer', {
        clientId: newSocket.id,
        userId: userId,
        userName: userName,
        roomId,
        description: sdp,
      });
    } catch (error) {
      console.log('sender offer error', error);
    }
  };

  const onHangOff = () => {
    navigate('../');
  };
  // set Muted
  const onToggleAudio = () => {};
  return (
    <>
      <MeetPageWrap>
        <Wrap>
          <main>
            {/* <J
            
            
            oinMeetModal
              newSocket={socket}
              userName={userName}
              joinModalOpen={joinModalOpen}
              setJoinModalOpen={setJoinModalOpen}
              setMyRoomId={setRoomId}
            /> */}
            <MeetGrid users={users} sidebarOpen={chatSidebarOpen} />
          </main>
          <ChatSidebar
            newSocket={socket}
            visible={chatSidebarOpen}
            roomId={roomId}
            user={user}
            onToggleChatSidebar={onToggleChatSidebar}
          />
        </Wrap>
        {/* <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button> */}
        <MeetFooter onHangOff>
          <FooterButtons
            onHangOff={onHangOff}
            onToggleChatSidebar={onToggleChatSidebar}
          />
          <UsersButton usersCount={users.length} />
        </MeetFooter>
      </MeetPageWrap>
    </>
  );
};
const MeetPageWrap = styled.div`
  height: 100vh;
  background: #212121;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Wrap = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  main {
    height: 100%;
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
`;

const MeetFooter = styled.div`
  display: flex;
  justify-content: center;
  algin-items: center;
  background: black;
`;
export default Meet;

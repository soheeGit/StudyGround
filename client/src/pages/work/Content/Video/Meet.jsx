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
let newSocket = io.connect(SOCKET_SERVER_URL, {
  transports: ['websocket'],
});

const Meet = () => {
  const [users, setUsers] = useState([]);
  // LocalStorage의 id불러오기
  const client = JSON.parse(localStorage.getItem('user'));
  const user = client.user;
  const userId = client.user.uId;
  const userName = client.user.uName;
  const navigate = useNavigate();

  const peerConnections = useRef({}); // 모든 상대방의 peerConnection 저장 객체
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const roomId = 'newRoom';

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [muted, setMuted] = useState(false);
  const [videoDisabled, setVideoDisabled] = useState(false);

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
        newSocket.on('connected', (socketId) => {
          console.log('Connected Success ! Your Socket Id : ', socketId);
          setSocket(newSocket);
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
        console.log(users);
        // room 입장(1개의 고정방 자동입장)
        newSocket.emit('joinRoom', {
          roomId: roomId,
          userId: userId,
          userName: userName,
        });

        newSocket.on('usersInRoom', async (data) => {
          console.log('현재 방 참가자 목록 :', data.users);
          if (data.users.length > 1) {
            for (const user of data.users) {
              if (user.socketId !== newSocket.id) {
                const pc = createPeerConnection(
                  newSocket,
                  user.socketId,
                  user.userId,
                  user.userName,
                  stream,
                  true
                );
                console.log(peerConnections);
                await createOffer(
                  pc,
                  newSocket,
                  user.socketId,
                  user.userId,
                  userId,
                  userName
                );
              }
            }
          }
        });

        newSocket.on('userJoined', (data) => {
          if (data.userId !== userId) {
            console.log(`${data.userName}님이 입장하였습니다.`, data);
            createPeerConnection(
              newSocket,
              data.socketId,
              data.userId,
              data.userName,
              stream,
              false
            );
          }
        });

        newSocket.on('offer', async (data) => {
          console.log(`received offer from ${data.senderId}`, data);
          const myPC = peerConnections.current[data.senderWebId];
          myPC.setRemoteDescription(
            new RTCSessionDescription(data.description)
          );
          console.log(peerConnections.current[data.senderWebId]);
          const answer = await myPC.createAnswer();
          myPC.setLocalDescription(answer);
          newSocket.emit('answer', {
            senderWebId: userId,
            senderName: userName,
            receiverId: data.senderId,
            roomId: roomId,
            description: answer,
          });
          console.log(`created Answer for ${data.senderId}`, answer);
        });

        newSocket.on('answer', (data) => {
          console.log(`received answer from ${data.senderId}`, data);
          let myPC = peerConnections.current[data.senderWebId];
          myPC.setRemoteDescription(
            new RTCSessionDescription(data.description)
          );
        });

        newSocket.on('iceCandidate', (data) => {
          console.log('Received IceCandidates from', data);
          let myPC = peerConnections.current[data.clientWebId];
          console.log(myPC);
          console.log(data.clientWebId);
          myPC
            .addIceCandidate(new RTCIceCandidate(data.candidate))
            .then(() => {
              console.log('ICE Candidates Added Successfully !');
            })
            .catch((error) => {
              console.error('Error adding ICE Candidates', error);
            });
        });
      } catch (error) {
        console.log('catch error : ', error);
      }

      return () => {
        newSocket.off('userJoined');
      };
    };
    onSocket();
  }, []);

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

  const createPeerConnection = (
    newSocket,
    peerSocketId,
    peerWebId,
    peerName,
    stream, // local mediaStream
    isSender
  ) => {
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
    let pc = new RTCPeerConnection(pc_config);
    console.log(`created pc for ${peerName}`);

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log('onicecandidate', e);
        newSocket.emit('onicecandidate', {
          roomId: roomId,
          candidate: e.candidate,
          clientId: newSocket.id,
          userName: userName,
          receiverId: peerSocketId,
          receiverWebId: peerWebId,
          clientWebId: userId,
        });
      }
    };

    pc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    pc.ontrack = (e) => {
      console.log('ontrack success!', e);
      const peerStream = {
        clientId: peerSocketId,
        userId: peerWebId,
        userName: peerName,
        stream: e.streams[0],
      };
      console.log(userId);
      setUsers((prevUsers) => {
        const userExists = prevUsers.some((user) => user.userId === peerWebId);
        if (!userExists) {
          return [...prevUsers, peerStream];
        }
        return prevUsers;
      });
    };

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
      console.log(`Success local AddTrack !`);
    });

    peerConnections.current[peerWebId] = pc;
    console.log(peerConnections.current);

    return pc;
  };

  const createOffer = async (
    pc,
    newSocket,
    receiverId,
    receiverWebId,
    senderWebId,
    senderName
  ) => {
    let myPC = peerConnections.current[receiverWebId];
    const offer = await myPC.createOffer();
    await myPC.setLocalDescription(offer);
    console.log(peerConnections.current[receiverWebId]);

    newSocket.emit('offer', {
      senderWebId,
      senderName,
      receiverId,
      roomId,
      description: offer,
    });
    console.log(`created offer for ${receiverId}`, offer);
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
  height: 70px;
  display: flex;
  justify-content: center;
  algin-items: center;
  background: black;
`;
export default Meet;

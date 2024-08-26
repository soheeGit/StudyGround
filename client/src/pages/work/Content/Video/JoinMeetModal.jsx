import { useState } from 'react';
import MyModal from '../../Component/MyModal';
import styled from 'styled-components';

const JoinMeetModal = ({
  newSocket,
  userName,
  joinModalOpen,
  setJoinModalOpen,
  setMyRoomId,
}) => {
  console.log(newSocket);
  const [roomId, setRoomId] = useState('');
  const onChangeRoomId = (e) => {
    setRoomId(e.target.value);
  };
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim() && userName.trim()) {
      newSocket.emit('joinRoom', {
        roomId: roomId,
        socketId: newSocket.id,
        userName: userName,
      });
      setMyRoomId(roomId);
      setRoomId('');
      setJoinModalOpen(false);
    }
  };
  return (
    <MyModal show={joinModalOpen}>
      <ModalWrap>
        <Header>Join Room</Header>
        <InputForm>
          <h3>Room Id : </h3>
          <form onSubmit={handleJoinRoom}>
            <input type="text" value={roomId} onChange={onChangeRoomId} />
            <button type="submit">입장</button>
          </form>
        </InputForm>
      </ModalWrap>
    </MyModal>
  );
};
export default JoinMeetModal;

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
`;

const InputForm = styled.div`
  display: flex;
  align-items: center;
  input {
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

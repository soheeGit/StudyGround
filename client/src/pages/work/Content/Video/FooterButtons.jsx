import { useState } from 'react';
import IconButton from './IconButton';
import styled from 'styled-components';
import { IoIosMic } from 'react-icons/io';
import { IoMicOffOutline } from 'react-icons/io5';
import { IoMdVideocam } from 'react-icons/io';
import { IoVideocamOffSharp } from 'react-icons/io5';
import { MdScreenShare } from 'react-icons/md';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { MdCallEnd } from 'react-icons/md';

const FooterButtons = ({ onHangOff, onToggleChatSidebar }) => {
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const onToggleMuted = () => {
    setMuted(!muted);
  };
  const onToggleVideoOff = () => {
    setVideoOff(!videoOff);
  };
  const onScreenShare = () => {};
  return (
    <>
      <Group>
        {muted ? (
          <IconButton name="Audio" onClick={onToggleMuted}>
            <IoMicOffOutline size={'20px'} color="red" />
          </IconButton>
        ) : (
          <IconButton name="Audio" onClick={onToggleMuted}>
            <IoIosMic size={'20px'} />
          </IconButton>
        )}
        {videoOff ? (
          <IconButton name="video" onClick={onToggleVideoOff}>
            <IoVideocamOffSharp size={'20px'} color="red" />
          </IconButton>
        ) : (
          <IconButton name="video" onClick={onToggleVideoOff}>
            <IoMdVideocam size={'20px'} />
          </IconButton>
        )}
        <IconButton name="Share" onClick={onScreenShare}>
          <MdScreenShare size={'20px'} color="#23D957" />
        </IconButton>
        <IconButton name="Chat" onClick={onToggleChatSidebar}>
          <IoChatbubbleEllipsesOutline size={'20px'} />
        </IconButton>
        <IconButton name="End" onClick={onHangOff}>
          <MdCallEnd size={'20px'} color="red" />
        </IconButton>
      </Group>
    </>
  );
};

const Group = styled.div`
  display: flex;
`;

export default FooterButtons;

import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MeetGridItem = ({ stream, userName, width }) => {
  const ref = useRef(null);
  console.log(width);
  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <MeetGridItemBlock>
      <VideoContainer ref={ref} playsInline autoPlay />
      <Overlay>{userName}</Overlay>
    </MeetGridItemBlock>
  );
};
export default MeetGridItem;

const MeetGridItemBlock = styled.div`
  width: 100%;
  position: relative;
  border: 8px solid #212121;
`;

const VideoContainer = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: relative;
  bottom: 479px;
  right: 293px;
  color: white;
  background-color: #7f7f7f;
  padding: 5px;
  border-radius: 5px;
`;

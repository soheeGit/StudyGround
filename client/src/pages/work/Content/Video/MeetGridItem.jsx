import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MeetGridItem = ({ stream }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <MeetGridItemBlock>
      {stream ? (
        <VideoContainer ref={ref} playsInline autoPlay />
      ) : (
        <PlaceholderImage
          src="/path/to/placeholder-image.jpg"
          alt="No Video Available"
        />
      )}
    </MeetGridItemBlock>
  );
};
export default MeetGridItem;

const MeetGridItemBlock = styled.div`
  border: 8px solid #212121;
  position: releative;
`;

const VideoContainer = styled.video`
  object-fit: cover; // video 태그 무조건 1:1 비율인걸 없애줌
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const PlaceholderImage = styled.img`
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

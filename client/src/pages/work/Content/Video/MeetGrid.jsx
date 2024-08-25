import styled from 'styled-components';
import MeetGridItem from './MeetGridItem';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

const MeetGrid = ({ users, sidebarOpen, remoteViedeoRef }) => {
  const [itemWidth, setItemWidth] = useState(0);

  const divisor = useMemo(() => {
    return Math.ceil(Math.sqrt(users.length)) || 1;
  }, [users.length]);

  useLayoutEffect(() => {
    const gridWidth = sidebarOpen
      ? document.body.offsetWidth - 420
      : document.body.offsetWidth - 100;
    setItemWidth(gridWidth / divisor);
  }, [divisor, sidebarOpen]);

  return (
    <Grid>
      {users.map((user, index) => (
        <MeetGridItem
          key={index}
          stream={user.stream}
          userName={user.userName}
          width={itemWidth}
        />
      ))}
    </Grid>
  );
};
export default MeetGrid;

const Grid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: black;
`;

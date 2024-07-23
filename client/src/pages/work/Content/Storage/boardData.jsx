import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupResponse = await axios.get('/api/myBoard', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setBoards(groupResponse.data);
        console.log(groupResponse.data);
      } catch (error) {
        console.error('스터디리스트를 가져오는 중 오류 발생:', error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div>
      qwewqe
      {boards.map((board) => (
        <div key={board.bId}>
          <Link to={`/work/${board.bId}/dashboard`}>링크 입니다</Link>
        </div>
      ))}
    </div>
  );
};

export default BoardList;

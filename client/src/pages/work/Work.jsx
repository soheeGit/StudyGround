import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import './Work.css';
import Sidebar from './sidebar/Sidebar';
import WorkHeader from './WorkHeader';
import axios from 'axios';

const Work = (props) => {
  const { boardId } = useParams();

  // 스터디 정보 최초 조회
  const [myBoard, setMyBoard] = useState();
  const fetchMyBoard = async () => {
    try {
      const response = await axios.get(`/api/partBoards/${boardId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMyBoard(response.data);
    } catch (error) {
      console.error('내스터디 데이터를 가져오는 중 오류 발생:', error);
    }
  };
  useEffect(() => {
    fetchMyBoard();
  }, [boardId]);

  return (
    <div className="work-container">
      <Sidebar boardId={boardId} />
      <div className="content-container">
        <Outlet context={{ boardId, myBoard }} />
      </div>
    </div>
  );
};

export default Work;

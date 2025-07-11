import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import './Work.css';
import Sidebar from './sidebar/Sidebar';
import WorkHeader from './WorkHeader';
import DashBoard from './Content/Dashboard/DashBoard';
import axios from 'axios';

const Work = (props) => {
  const { boardId } = useParams();

  // 스터디 정보 최초 조회
  const [myStudy, setMyStudy] = useState();
  const leaderId = myStudy?.leaderId;
  useEffect(() => {
    const fetchMyBoard = async () => {
      try {
        const Response = await axios.get(`/api/partBoards/${boardId}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setMyStudy(Response.data);
        console.log(Response.data);
      } catch (error) {
        console.error('내스터디 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMyBoard();
  }, []);

  return (
    <div className="work-container">
      <Sidebar boardId={boardId} />
      <div className="content-container">
        {myStudy ? <Outlet context={{ boardId, myStudy, leaderId }} /> : <></>}
      </div>
    </div>
  );
};

export default Work;

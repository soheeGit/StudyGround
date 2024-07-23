import React, { useEffect, useState } from 'react';
import './NoticePage.css';
import WorkHeader from '../../../WorkHeader';
import axios from 'axios';
import { Link, useOutletContext } from 'react-router-dom';

const NoticePage = () => {
  const { boardId } = useOutletContext();

  // Notice 데이터
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);

  //   const handleSelectTask = (task) => {
  //     setSelectedTask(task);
  //   };

  //   const handleBackToList = () => {
  //     setSelectedTask(null);
  //   };

  // fetch Notice data
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const noticeResponse = await axios.get(`/storage/notice/${boardId}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setNotices(noticeResponse.data);
        console.log(noticeResponse.data);
      } catch (error) {
        console.error('공지사항 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchNotice();
  }, [boardId]);

  // task dummy data
  //   const task = [
  //     {
  //       id: 4,
  //       title: '스크립트나 롤플레잉 관련 연습 후 녹음하여 올리기',
  //       status: '진행중',
  //       submitStatus: '-',
  //       dueDate: '2024.04.01 오후 11:59',
  //     },
  //     {
  //       id: 3,
  //       title: '일주일동안 매일 하나씩 영어 일기 써온 후 업로드하기',
  //       status: '종료',
  //       submitStatus: 'x',
  //       dueDate: '2024.03.18 오후 11:59',
  //     },
  //     {
  //       id: 2,
  //       title: '3월 19일 스터디 할 주제 2개씩 찾아 온 후 스크립트 써오기',
  //       status: '종료',
  //       submitStatus: '-',
  //       dueDate: '2024.03.18 오후 11:59',
  //     },
  //     {
  //       id: 1,
  //       title: '많이 쓰이는 일상속 대화 표현 찾아오기 각 30개',
  //       status: '종료',
  //       submitStatus: '-',
  //       dueDate: '2024.03.11 오후 11:59',
  //     },
  //   ];
  return (
    <>
      <WorkHeader title="Storage" />
      <div className="task-header-container">Notice</div>
      <hr id="divider" />
      {/* {!selectedTask ? (
        <TaskList tasks={task} onSelectTask={handleSelectTask} />
      ) : (
        <TaskDetail task={selectedTask} onBack={handleBackToList} />
      )} */}
    </>
  );
};
export default NoticePage;

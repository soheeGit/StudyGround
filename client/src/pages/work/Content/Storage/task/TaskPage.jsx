import React, { useEffect, useState } from 'react';
import './TaskPage.css';
import WorkHeader from '../../../WorkHeader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskList from './TaskList';
import TaskDetail from './TaskDetail';

const TaskPage = () => {
  // Task 데이터
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleBackToList = () => {
    setSelectedTask(null);
  };
  //   useEffect(() => {
  //     const fetchTasks = async () => {
  //       try {
  //         const taskResponse = await axios.get(`/storage/task/${.id}`, {
  //           withCredentials: true,
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         });
  //         setTasks(taskResponse.data);
  //         console.log(taskResponse.data);
  //       } catch (error) {
  //         console.error('과제 데이터를 가져오는 중 오류 발생:', error);
  //       }
  //     };

  //     fetchTasks();
  //   }, []);
  // task dummy data
  const task = [
    {
      id: 4,
      title: '스크립트나 롤플레잉 관련 연습 후 녹음하여 올리기',
      status: '진행중',
      submitStatus: '-',
      dueDate: '2024.04.01 오후 11:59',
    },
    {
      id: 3,
      title: '일주일동안 매일 하나씩 영어 일기 써온 후 업로드하기',
      status: '종료',
      submitStatus: 'x',
      dueDate: '2024.03.18 오후 11:59',
    },
    {
      id: 2,
      title: '3월 19일 스터디 할 주제 2개씩 찾아 온 후 스크립트 써오기',
      status: '종료',
      submitStatus: '-',
      dueDate: '2024.03.18 오후 11:59',
    },
    {
      id: 1,
      title: '많이 쓰이는 일상속 대화 표현 찾아오기 각 30개',
      status: '종료',
      submitStatus: '-',
      dueDate: '2024.03.11 오후 11:59',
    },
  ];
  return (
    <>
      <WorkHeader title="Storage" />
      <div className="task-header-container">Task</div>
      <hr />
      {!selectedTask ? (
        <TaskList tasks={task} onSelectTask={handleSelectTask} />
      ) : (
        <TaskDetail task={selectedTask} onBack={handleBackToList} />
      )}
    </>
  );
};
export default TaskPage;

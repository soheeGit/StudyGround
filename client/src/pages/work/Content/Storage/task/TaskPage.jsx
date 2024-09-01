import React, { useEffect, useRef, useState } from 'react';
import './TaskPage.css';
import WorkHeader from '../../../WorkHeader';
import axios from 'axios';
import { BsXLg } from 'react-icons/bs';
import { IoCheckmarkSharp } from 'react-icons/io5';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import TaskDetail from './TaskDetail';
import { Button } from '../../../Component/Button';
import { format } from 'date-fns'; // date-fns import
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../../../api/taskApi';

const TaskPage = () => {
  const { boardId, leaderId } = useOutletContext();
  const client = JSON.parse(localStorage.getItem('user'));
  const userId = client.user.id;
  const location = useLocation();
  const navigate = useNavigate();
  const fetchTasksRef = useRef(null);

  const [isOutletVisible, setIsOutletVisible] = useState(false);

  // Task 데이터
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleBackToList = () => {
    setSelectedTask(null);
  };

  // 과제  get
  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['tasks', boardId],
    queryFn: () => fetchTasks(boardId),
  });
  fetchTasksRef.current = refetch;

  // 과제 제출 상태 렌더링 로직
  const responseWithIsSubmit =
    tasks &&
    tasks.map((task) => {
      const isSubmitted = task.SubmitTasks.some(
        (SubmitTask) => SubmitTask.userId === userId
      );
      return {
        ...task,
        isSubmitted: isSubmitted,
      };
    });
  console.log(responseWithIsSubmit);

  // 현재 URL이 /task/addtask 경우 Outlet 활성화
  useEffect(() => {
    if (
      location.pathname.includes('/task/addtask') ||
      /\/task\/\d+/.test(location.pathname)
    ) {
      setIsOutletVisible(true);
    } else {
      setIsOutletVisible(false);
    }
  }, [location]);

  // 과제 상세확인 : TaskDetail Task데이터 넘기기
  const handleClickTask = (task) => {
    navigate(`/work/${boardId}/task/${task.id}`, { state: { task } });
  };

  /* 페이지네이션 */
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const datasPerPage = 8;

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지의 과제 가져오기
  const indexOfLastData = currentPage * datasPerPage;
  const indexOfFirstData = indexOfLastData - datasPerPage;
  const currentDatas =
    responseWithIsSubmit && responseWithIsSubmit.length > 0
      ? responseWithIsSubmit.slice(indexOfFirstData, indexOfLastData)
      : [];

  // 페이지 번호 계산
  const pageNumbers =
    tasks && tasks.length > 0
      ? Array.from(
          { length: Math.ceil(tasks.length / datasPerPage) },
          (_, i) => i + 1
        )
      : [];

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let formattedDate = format(date, 'yyyy.MM.dd a hh:mm ');
    formattedDate = formattedDate.replace('AM', '오전').replace('PM', '오후');
    return formattedDate;
  };

  return (
    <>
      {/* header */}
      <WorkHeader title="Storage" />
      <div className="task-header-container">Task</div>
      <hr id="divider" />

      {/* body */}
      {!isOutletVisible && (
        <>
          <div className="task-content-container">
            <div className="task-content-header">
              <div className="number-of-contents">순번</div>
              <div className="title-of-contents"></div>
              <div className="status-of-contents">진행</div>
              <div className="isSubmit-status">제출</div>
              <div className="duedate">마감일</div>
            </div>
            <div className="task-content-box">
              {currentDatas && currentDatas.length > 0 ? (
                currentDatas.map((task, taskKey) => (
                  <>
                    <div className="task-data-container" key={task.id}>
                      <div className="number-of-contents">{task.id}</div>
                      <div
                        className="title-of-contents"
                        onClick={() => handleClickTask(task)}
                      >
                        {task.title}
                      </div>
                      <div
                        className={`status-of-contents ${
                          task.status === '진행중' ? 'ongoing' : 'completed'
                        }`}
                      >
                        {task.status}
                      </div>
                      <div className="isSubmit-status">
                        {task.isSubmitted === true ? (
                          <IoCheckmarkSharp color="green" />
                        ) : (
                          <BsXLg color="red" />
                        )}
                      </div>
                      <div className="duedate">{formatDate(task.deadline)}</div>
                    </div>
                  </>
                ))
              ) : (
                <></>
              )}
            </div>

            <div className="pagination">
              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  name={number}
                  onClick={() => handlePageChange(number)}
                  color="#D9D9D9"
                  hoverColor="#E0E0E0"
                />
              ))}
            </div>
            {leaderId === client.user.id ? (
              <div className="buttonsArea">
                <Button
                  name="등록"
                  color="#E86161"
                  onClick={() => navigate('addtask')}
                  hoverColor="#D2625D"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      <Outlet context={{ boardId, fetchTasksRef, leaderId, client }} />
    </>
  );
};
export default TaskPage;

import React, { useEffect, useRef, useState } from 'react';
import './TaskPage.css';
import WorkHeader from '../../../WorkHeader';
import axios from 'axios';
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

const TaskPage = () => {
  const { boardId } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const fetchTasksRef = useRef(null);

  const [isOutletVisible, setIsOutletVisible] = useState(false);

  // Task 데이터
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleBackToList = () => {
    setSelectedTask(null);
  };

  // 과제 데이터 get
  const fetchTasks = async () => {
    try {
      const taskResponse = await axios.get(`/storage/task/${boardId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // taskResponse에 Status를 추가
      const taskWithStatus = taskResponse.data.map((task) => {
        const current_time = new Date();
        const deadline = task.deadline;
        return {
          ...task,
          status: current_time > deadline ? '종료' : '진행중',
        };
      });
      setTasks(taskWithStatus);
    } catch (error) {
      console.error('과제 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchTasksRef.current = fetchTasks;
  }, [boardId]);

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

  // 현재 페이지의 공지사항 가져오기
  const indexOfLastData = currentPage * datasPerPage;
  const indexOfFirstData = indexOfLastData - datasPerPage;
  const currentDatas = tasks.slice(indexOfFirstData, indexOfLastData);

  // 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tasks.length / datasPerPage); i++) {
    pageNumbers.push(i);
  }

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
                        // onClick={() => onSelectTask(task)}
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
                      <div className="isSubmit-status">{task.submitStatus}</div>
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
            <div className="buttonsArea">
              <Button
                name="등록"
                color="#E86161"
                onClick={() => navigate('addtask')}
                hoverColor="#D2625D"
              />
            </div>
          </div>
        </>
      )}
      {/* {!selectedTask ? (
        <TaskList tasks={tasks} onSelectTask={handleSelectTask} />
      ) : (
        <TaskDetail task={selectedTask} onBack={handleBackToList} />
      )} */}
      <Outlet context={{ boardId, fetchTasksRef }} />
    </>
  );
};
export default TaskPage;

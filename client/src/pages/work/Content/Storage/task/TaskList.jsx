import React from 'react';
import './TaskList.css';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, onSelectTask }) => {
  return (
    <div className="task-content-container">
      <div className="task-content-header">
        <div className="number-of-contents">순번</div>
        <div className="title-of-contents">제목</div>
        <div className="status-of-contents">진행</div>
        <div className="isSubmit-status">제출</div>
        <div className="duedate">마감일</div>
      </div>
      {tasks.map((task) => (
        <>
          <div className="task-data-container" key={task.id}>
            <div className="number-of-contents">{task.id}</div>
            <div
              className="title-of-contents"
              onClick={() => onSelectTask(task)}
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
            <div className="duedate">{task.dueDate}</div>
          </div>
          <div className="task-divider"></div>
        </>
      ))}
    </div>
  );
};

export default TaskList;

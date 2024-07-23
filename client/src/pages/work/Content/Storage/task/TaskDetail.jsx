import React from 'react';
import './TaskDetail.css';

const TaskDetail = ({ task }) => {
  return (
    <div className="task-detail-container">
      <div className="task-detail-header">
        <hr />
        <div className="detail-box">
          <div className="detail-field">제목 | </div>
        </div>
        <div>제목: {task.title}</div>
        <div>제출방식: {task.submissionMethod}</div>
        <div>게시일: {task.postingDate}</div>
        <div>마감일: {task.dueDate}</div>
        <div>지각제출: {task.isLateSubmissionAllowed ? '허용' : '불허'}</div>
      </div>
      <div className="detail-content">{task.content}</div>
      <div className="attachments">
        <div>첨부파일1: {task.attachment1}</div>
        <div>첨부파일2: {task.attachment2}</div>
        <div>첨부파일3: {task.attachment3}</div>
      </div>
    </div>
  );
};

export default TaskDetail;

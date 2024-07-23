import React from 'react';
import './TaskDetail.css';

const TaskDetail = ({ task }) => {
  return (
    <div className="task-detail-container">
      <div className="task-detail-header">
        <hr />
        <div className="task-detail-box">
          <div className="task-detail-field">제목</div>
          <div className="task-detail-content">{task.title}</div>
        </div>
        <hr />
        <div className="task-detail-box">
          <div className="task-detail-field">제출방식</div>
          <div className="task-detail-content">{task.submissionMethod}</div>
        </div>
        <hr />
        <div className="task-detail-box">
          <div className="task-detail-field">게시일</div>
          <div className="task-detail-content">{task.postingDate}</div>
        </div>
        <hr />
        <div className="task-detail-box">
          <div className="task-detail-field">마감일</div>
          <div className="task-detail-content">{task.dueDate}</div>
        </div>
        <hr />
        <div className="task-detail-box">
          <div className="task-detail-field">지각제출</div>
          <div className="task-detail-content">
            {task.isLateSubmissionAllowed ? '허용' : '불허'}
          </div>
        </div>
        <hr />
      </div>
      <div className="detail-content">{task.content}</div>
      <div className="task-submit-textarea">
        <textarea
          // value={submitTask}
          // onChange={(e) => setEditedContent(e.target.value)}
          placeholder="내용을 입력해 주세요"
        />
      </div>
      <hr id="divider" />
      <div className="attachments">
        <div>첨부파일1: {task.attachment1}</div>
        <div>첨부파일2: {task.attachment2}</div>
        <div>첨부파일3: {task.attachment3}</div>
      </div>
    </div>
  );
};

export default TaskDetail;

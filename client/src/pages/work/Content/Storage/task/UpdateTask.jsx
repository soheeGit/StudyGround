import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useNavigate,
  useParams,
  useLocation,
  useOutletContext,
} from 'react-router-dom';
import { Button } from '../../../Component/Button';
import './UpdateTask.css';

const UpdateTask = () => {
  const { boardId, fetchTasksRef } = useOutletContext();
  const { taskId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { task } = location.state || {};

  // 수정중인 과제 데이터
  const [title, setTitle] = useState(task.title || '');
  const [content, setContent] = useState(task.content || '');
  const [deadline, setDeadline] = useState(task.deadline || '');
  const [files, setFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleDeleteFile = (fileId) => {
    setFilesToDelete([...filesToDelete, fileId]);
  };

  // 과제 수정 post
  const handleUpdateTask = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('deadline', deadline);
    formData.append('filesToDelete', JSON.stringify(filesToDelete));
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await axios.post(
        `/storage/updateTask/${taskId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.success) {
        alert('과제가 성공적으로 수정되었습니다.');
        if (fetchTasksRef.current) {
          fetchTasksRef.current();
        }
        navigate(`/work/${boardId}/task`);
      } else {
        alert('과제 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('과제 수정 중 오류 발생:', error);
      alert('과제 수정 중 오류가 발생했습니다.');
    }
  };

  // 수정
  const handleCancelUpdate = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="detail-container">
      <form onSubmit={handleUpdateTask}>
        <div className="detail-field">
          <div className="detail-field-title">제목</div>
          <div className="divider-column"></div>
          <input
            type="text"
            className="inputType"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
          />
        </div>
        <div className="detail-field">
          <div className="detail-field-title">게시일</div>
          <div className="divider-column"></div>
          {task.updatedAt}
        </div>
        <div className="detail-field">
          <div className="detail-field-title">마감일</div>
          <div className="divider-column"></div>
          {task.deadline}
          {' -> '}
          <input
            type="datetime-local"
            className="inputType"
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="detail-field">
          <textarea
            style={{ width: '100%', height: '400px' }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요"
          />
        </div>
        <div className="divider-row"></div>
        <div className="attachArea">
          <div className="attachArea-row">
            <div className="attachArea-title">첨부파일</div>
            <div className="divider-column"></div>
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="existing-files">
            {task.files.map((file) => (
              <div key={file.id} className="file-item">
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.fileName}
                </a>
                <button type="button" onClick={() => handleDeleteFile(file.id)}>
                  삭제
                </button>
              </div>
            ))}
          </div>
          <div className="divider-row"></div>
          <div className="enroll-button">
            <Button
              type="submit"
              name="수정하기"
              color="#E86161"
              hoverColor="#D2625D"
            />
            <Button
              type="button"
              name="취소"
              color="#D9D9D9"
              onClick={handleCancelUpdate}
              hoverColor="#E0E0E0"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;

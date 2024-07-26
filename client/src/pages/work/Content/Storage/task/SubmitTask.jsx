import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { Button } from '../../../Component/Button';
import './SubmitTask.css';
import Divider from '../../../Component/Divider';

const SubmitTask = () => {
  const { boardId } = useOutletContext();
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleSubmitTask = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post(
        `/storage/submitTask/${taskId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.success) {
        alert('과제가 성공적으로 제출되었습니다.');
        // if (fetchTasksRef.current) {
        //   fetchTasksRef.current();
        // }
        navigate(`/work/${boardId}/task`);
      } else {
        alert('과제 제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('과제 제출 중 오류 발생:', error);
      alert('과제 제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="submit-task-container">
      <form onSubmit={handleSubmitTask}>
        <div className="detail-field">
          <textarea
            style={{ width: '100%', height: '200px' }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="제출 내용을 입력해 주세요"
          />
        </div>
        <div className="detail-field">
          <div className="detail-field-title">첨부파일</div>
          <input type="file" id="files" multiple onChange={handleFileChange} />
        </div>
        <div className="detail-field">
          <div className="detail-field-title">첨부파일</div>
          <input type="file" id="files" multiple onChange={handleFileChange} />
        </div>
        <div className="detail-field">
          <div className="detail-field-title">첨부파일</div>
          <input type="file" id="files" multiple onChange={handleFileChange} />
        </div>
        <Divider color="#000000" height={'2px'} margin={'10px'} />
        <div className="submit-button">
          <Button
            type="submit"
            name="제출하기"
            color="#E86161"
            hoverColor="#CC514A"
          />
        </div>
      </form>
    </div>
  );
};

export default SubmitTask;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useNavigate,
  useParams,
  useOutletContext,
  useNavigation,
} from 'react-router-dom';
import { Button } from '../../../Component/Button';
import './SubmitTask.css';
import Divider from '../../../Component/Divider';
import SubmitTaskDetail from './SubmitTaskDetail';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitTask } from '../../../api/taskApi';

const SubmitTask = ({ submitTasks }) => {
  // LocalStorage의 id불러오기
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData.user.id;
  const queryClient = useQueryClient();

  const { boardId } = useOutletContext();
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  // 과제 제출
  const mutation = useMutation({
    mutationFn: (formData) => submitTask({ taskId, formData }),
    onSuccess: () => {
      alert('과제가 성공적으로 제출되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['tasks', boardId],
        refetchType: 'all',
      });
      navigate('../');
    },
    onError: (error) => {
      console.error('과제 제출 중 오류 발생:', error);
      alert('과제 제출 중 오류가 발생했습니다.');
    },
  });

  const handleSubmitTask = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    files.forEach((file) => {
      formData.append('files', file);
    });
    mutation.mutate(formData);
  };

  // 내 제출한 과제 확인
  const userSubmitTask = submitTasks.find((task) => task.userId === userId);
  console.log(userSubmitTask);

  return (
    <>
      <div className="submit-task-container">
        {userSubmitTask ? (
          <>
            <div className="">과제 제출완료</div>
          </>
        ) : (
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
              <input
                type="file"
                id="files"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div className="detail-field">
              <div className="detail-field-title">첨부파일</div>
              <input
                type="file"
                id="files"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div className="detail-field">
              <div className="detail-field-title">첨부파일</div>
              <input
                type="file"
                id="files"
                multiple
                onChange={handleFileChange}
              />
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
        )}
      </div>
    </>
  );
};

export default SubmitTask;

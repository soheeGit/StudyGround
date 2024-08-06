import React, { useEffect, useState } from 'react';
import './AddNotice.css';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '../../../Component/Button';
import { useMutation } from '@tanstack/react-query';
import { addNotice } from '../../../api/storageApi';

const AddNotice = () => {
  const { boardId, fetchNoticesRef } = useOutletContext();
  const navigate = useNavigate();

  // 공지사항 추가 state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [isImportant, setIsImportant] = useState(false);

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  // 공지사항 추가 mutation
  const mutation = useMutation({
    mutationFn: (formData) => addNotice({ boardId, formData }),
    onSuccess: (data) => {
      alert('공지사항이 성공적으로 추가되었습니다.');
      navigate(`/work/${boardId}/notice`);
    },
    onError: (error) => {
      console.error('공지사항 추가 중 오류 발생 : ', error);
      alert('공지사항 추가 중 오류가 발생하였습니다.');
    },
  });

  const handleAddNotice = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('importance', isImportant ? 'High' : 'Low');
    files.forEach((file) => {
      formData.append('files', file);
    });

    mutation.mutate(formData);
  };

  return (
    <div className="detail-container">
      <form onSubmit={handleAddNotice}>
        <div className="detail-field">
          <div className="detail-field-title">제목</div>
          <div className="divider-column"></div>
          <input
            type="text"
            className="inputType"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
          />
          <div className="checkboxArea">
            중요
            <input
              type="checkbox"
              id="checkbox"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
            />
          </div>
        </div>
        <div className="detail-field">
          <textarea
            style={{ width: '100%', height: '400px' }}
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
          <div className="divider-row"></div>
          <div className="enroll-button">
            <Button
              type="submit"
              name="등록하기"
              color="#E86161"
              hoverColor="#CC514A "
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddNotice;

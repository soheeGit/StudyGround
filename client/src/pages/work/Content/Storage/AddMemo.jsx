import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddMemo.css';

Modal.setAppElement('#root'); // 모달이 열렸을 때 스크린 리더가 읽지 않을 요소 설정

const MemoModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    onSubmit({ title, content });
    setTitle('');
    setContent('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Memo Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          width: '50%',
          height: '50%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <div className="add-memo-modal-container">
        <h2>새 메모 작성</h2>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="input-title"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="input-content"
        />
        <div className="add-memo-buttons">
          <button onClick={handleSubmit}>저장</button>
          <button onClick={onRequestClose}>취소</button>
        </div>
      </div>
    </Modal>
  );
};

export default MemoModal;

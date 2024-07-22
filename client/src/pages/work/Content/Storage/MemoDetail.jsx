/* MemoDetail.jsx */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './MemoDetail.css';
import axios from 'axios';
import xicon from '../../../../assets/xicon.png';
import trashcan from '../../../../assets/trashcan.png';
import editbutton from '../../../../assets/editbutton.png';

Modal.setAppElement('#root'); // 모달이 열렸을 때 스크린 리더가 읽지 않을 요소 설정

const MemoDetail = ({ isOpen, onRequestClose, data, onUpdate, onDelete }) => {
  // 메모 수정
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(data.title);
  const [editedContent, setEditedContent] = useState(data.content);
  const [selectedMemoId, setSelectedMemoId] = useState(data.id);
  console.log(data.id);

  useEffect(() => {
    if (isEditing) {
      setEditedTitle(data.title);
      setEditedContent(data.content);
    }
  }, [isEditing, data.title, data.content]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.post(
        `/storage/updateMemo/${data.id}`,
        {
          title: editedTitle,
          content: editedContent,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        onUpdate(data.id, editedTitle, editedContent);
        setIsEditing(false);
        onRequestClose();
      }
    } catch (error) {
      console.error('메모를 수정하는 중 오류 발생:', error);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTitle(data.title);
    setEditedContent(data.content);
  };

  // 메모 삭제
  const handleDelete = async () => {
    try {
      console.log(data.id);
      console.log(`${data.id}`);
      const response = await axios.get(`/storage/deleteMemo/${data.id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        onDelete(data.id); // 삭제 후 콜백 함수 호출
        onRequestClose(); // 모달 닫기
      }
    } catch (error) {
      console.error('메모를 삭제하는 중 오류 발생:', error);
    }
  };
  const detailData = [data];
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Memo Detail"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '50%', // 모달 너비
          height: '50%',
        },
      }}
    >
      <div className="detail-container">
        <div className="detail-header">
          <div className="detail-date">
            {/* {detailData[0].edit_time.date}_{detailData[0].edit_time.time} */}
          </div>
          <div className="three-buttons-contianer">
            <img src={editbutton} width="25px" onClick={handleEdit} />
            <img src={trashcan} width="25px" onClick={handleDelete} />
            <img src={xicon} width="25px" onClick={onRequestClose} />
          </div>
        </div>
        {isEditing ? (
          <div className="edit-mode-container">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="add-memo-buttons">
              <button onClick={handleEditSave}>저장</button>
              <button onClick={handleEditCancel}>취소</button>
            </div>
          </div>
        ) : (
          <>
            <div className="detail-title">{detailData[0].title}</div>
            <div className="detail-content">{detailData[0].content}</div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default MemoDetail;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import evalimg from '../../../assets/image 102.png';
import './Evaluation.css';

const Evaluation = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleReviewClick = () => {
    if (!boardId) {
      console.error('Board ID is not available', boardId);
      return;
    }

    navigate(`/evaluation/${boardId}`);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null; // Render nothing if modal is closed

  return (
    <>
      <div className="overlay" onClick={handleClose} />
      <div className="evaluation-modal">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
        <img src={evalimg} alt="addbox Icon" className="icon" />
        <div className="evaluation-text">
          <p>
            열정과 끈기로 스터디를 완수하셨습니다. <br />
            정말 대단해요!
            <br />
            당신의 앞날을 기원합니다.
          </p>
          <div className="evaluation-button">
            <button type="button" onClick={handleReviewClick}>
              팀원 상호평가 하러가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Evaluation;

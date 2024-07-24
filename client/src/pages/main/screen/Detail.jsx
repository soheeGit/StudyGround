import './Detail.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Detail() {
  const [board, setBoard] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch('/api/boards')
      .then((response) => response.json())
      .then((data) => {
        console.log('스터디 조회 api 불러옴:', data);
        const selectedBoard = data[0];
        setBoard(selectedBoard);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleParticipateClick = () => {
    if (!board || !board.bId) {
      console.error('Board ID is not available', board);
      return;
    }

    fetch(`/api/apply-board/${board.bId}`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert('신청 완료되었습니다.');
        } else {
          alert('신청 실패: ' + (data.message || 'Unknown error'));
        }
        console.log('Board ID:', board.bId);
      })
      .catch((error) => {
        console.error('Error applying for board:', error);
        setMessage('Internal server error');
      });
  };

  const handleReviewClick = () => {
    if (!board || !board.bId) {
      console.error('Board ID is not available', board);
      return;
    }

    navigate(`/evaluation/${board.bId}`); // Navigate to EvaluationTest with boardId
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Detail-page">
      <div className="Detail-top">
        <div className="detailTitle">
          <p>{board.bName}</p>
        </div>
      </div>

      <div className="detailMid">
        <div className="detail-content">
          <div className="contentName">| 스터디명</div>
          <div className="contentText">{board.bName}</div>
        </div>

        <div className="detail-content">
          <div className="contentName">| 작성자</div>
          <div className="contentText">홍길동</div>
        </div>

        <div className="detail-content">
          <div className="contentName">| 인원 현황</div>
          <div className="contentText">
            정원 {board.bTotalNumber}명 중 {board.bCurrentNumber}명 이용중
          </div>
        </div>

        <div className="detail-content">
          <div className="contentName">| 스터디 기간</div>
          <div className="contentText">
            {new Date(board.bStartDate).toLocaleDateString()} ~{' '}
            {new Date(board.bClosingDate).toLocaleDateString()}
          </div>
        </div>

        <div className="detail-content">
          <div className="contentName">| 작성자의 한마디</div>
          <div className="contentText">{board.bDescription}</div>
        </div>
      </div>

      <button className="detail-participate" onClick={handleParticipateClick}>
        참여하기
      </button>
      <button className="detail-review" onClick={handleReviewClick}>
        리뷰남기기
      </button>

      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default Detail;

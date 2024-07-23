import './Detail.css';
import React, { useState, useEffect } from 'react';

function Detail() {
  const [board, setBoard] = useState(null);

  useEffect(() => {

    fetch('/api/boards')
      .then(response => {
        // if (!response.ok) {
        //   throw new Error('Network response was not ok ' + response.statusText);
        // }
        return response.json();
      })
      .then(data => {
        console.log('스터디 조회 api 불러옴:', data);
        const selectedBoard = data[0];
        setBoard(selectedBoard);
        
        const endDate = new Date(selectedBoard.bClosingDate);
        const interval = setInterval(() => {
          const today = new Date();
          // const difference = endDate - today;
          // const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
          // setDDay(days >= 0 ? `D-${days}` : 'D-Day Passed');
        }, 1000);

        return () => clearInterval(interval);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Detail-page">
      <div className='Detail-top'>
        <div className='detailTitle'><p>{board.bName}</p></div>
      </div>
      
      <div className='detailMid'>
        <div className='detail-content'>
          <div className='contentName'>| 스터디명</div>
          <div className='contentText'>{board.bName}</div>
        </div>

        <div className='detail-content'>
          <div className='contentName'>| 작성자</div>
          <div className='contentText'>홍길동</div>
        </div>

        <div className='detail-content'>
          <div className='contentName'>| 인원 현황</div>
          <div className='contentText'>정원 {board.bTotalNumber}명 중 {board.bCurrentNumber}명 이용중</div>
        </div>

        <div className='detail-content'>
          <div className='contentName'>| 스터디 기간</div>
          <div className='contentText'>{new Date(board.bStartDate).toLocaleDateString()} ~ {new Date(board.bClosingDate).toLocaleDateString()}</div>
        </div>

        <div className='detail-content'>
          <div className='contentName'>| 작성자의 한마디</div>
          <div className='contentText'>{board.bDescription}</div>
        </div>
      </div>

      <button className='detail-participate' >참여하기</button>
    </div>
  );
}

export default Detail;

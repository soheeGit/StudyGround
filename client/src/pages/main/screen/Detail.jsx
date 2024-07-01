import './Detail.css';
import React, { useState, useEffect } from 'react';

function Detail({ selectedTitle }) {
  // selectedTitle에 해당하는 정보를 사용하여 세부 정보를 보여줌
  const [endDate, setEndDate] = useState(new Date('2024-12-31')); // 스터디 종료일 설정
  const [dDay, setDDay] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const difference = endDate - today;
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDDay(days >= 0 ? `D-${days}` : 'D-Day Passed');
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="Detail-page">
      <div className='Detail-top'>
        <div className='detailTitle'><p>{selectedTitle}</p></div>
      </div>
      
      <div className='detailMid'>
        <div className='detail-content'>
          <div className='contentName'>| 스터디명</div>
          <div className='contentText'>{selectedTitle}</div>
        </div>

        <div className='detail-content'>
          <div className='contentName'>| 작성자</div>
          <div className='contentText'>홍길동</div>
        </div>

        <div className='detail-content'>
          <div className='contentName'>| 인원 현황</div>
          <div className='contentText'>정원 40명 중 32명 이용중</div>
        </div>

        <div className='detail-content'>
          <div className='contentName'>| 스터디 기간</div>
          <div className='contentText'>2024.01.01 ~ 2024.12.31 ( {dDay} )</div>
        </div>

        <div className='detail-content'>
          <div className='contentName'>| 작성자의 한마디</div>
          <div className='contentText'>이곳은 공부를 위한 공간입니다.</div>
        </div>
      </div>

      <button className='detail-participate'>참여하기</button>
    </div>
  );
}

export default Detail;

import React, { useState } from 'react';
import './DashBoard.css';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import WorkHeader from '../../WorkHeader';
/* 필요한 data
- 스터디 시작날짜, 종료날짜
- 회원 닉네임
- 스터디 전체 회원 닉네임(이름)과 출석률
- 
 */
const DashBoard = () => {
  return (
    <div className='dashboard-container'>
      <WorkHeader title='DashBoard' />
      <div className='dday-container'>
        <div className='dday1'>
          <a /> D - 365
        </div>
        <div className='dday2'>
          <a />
          2024.01.01 ~ 2024.08.31
        </div>
      </div>
      <div className='achieve-rate-container'>달성률</div>
    </div>
  );
};

export default DashBoard;

/* 스터디장이 스터디 가입신청을 수락/거절하는 페이지 입니다. */

import React, { useState } from 'react';
import './Autho.css';
import WorkHeader from './work/WorkHeader';

/* 임시데이터 */
const participants = [
  { name: 'Yellow', rank: '전략자', role: '수행자', color: 'yellow' },
  { name: 'Red', rank: '전략자', role: '전략판단가', color: 'red' },
  { name: 'Green', rank: '전략자', role: '추진자', color: 'green' },
];

const Autho = () => {
  const [selectedTab, setSelectedTab] = useState('ongoing');

  return (
    <>
      <WorkHeader />
      <div className="container">
        <h1>My</h1>
        <h2 className="subtitle">내 스터디</h2>
        <div className="tab-selector">
          <button
            className={selectedTab === 'ongoing' ? 'active' : ''}
            onClick={() => setSelectedTab('ongoing')}
          >
            모집 진행중
          </button>
          <button
            className={selectedTab === 'closed' ? 'active' : ''}
            onClick={() => setSelectedTab('closed')}
          >
            모집 마감
          </button>
        </div>
        <hr />
        <div className="study-group">
          <div className="study-header">
            <span id="span1">간호조무사 스터디</span>
            <span id="span2">6/8</span>
          </div>
          <span className="study-date">2024.04.10</span>
          <div className="study-info">
            <div className="avatars">
              <span className="avatar">🙂</span>
              <span className="avatar">🙃</span>
              <span className="avatar">😊</span>
            </div>
            <span>현재 참여자</span>
          </div>
          {participants.map((participant, index) => (
            <div key={index} className={`participant-box ${participant.color}`}>
              <p>스터디 참여를 원합니다.</p>
              <div className="info-row">
                <span>닉네임: {participant.name}</span>
                <span>등급: {participant.rank}</span>
                <span>진단: {participant.role}</span>
                <div className="buttons">
                  <button className="accept-btn">수락</button>
                  <button className="reject-btn">거절</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </>
  );
};

export default Autho;

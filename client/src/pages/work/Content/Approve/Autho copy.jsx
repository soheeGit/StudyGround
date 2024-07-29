import React, { useState } from 'react';
import './Autho.css';
import WorkHeader from '../../WorkHeader';

const Autho = () => {
  const [selectedTab, setSelectedTab] = useState('ongoing');
  return (
    <>
      <WorkHeader />
      <div className="approve-container">
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
        {/* data 시작지점 */}
        <hr />
        <div className="study-group">
          <div className="autho-header-container">
            <div className="autho-header-left">
              <div className="study-header">
                <span id="span1">스터디 이름</span> {/* data */}
                <span id="span2">현재 인원수/</span>
                {/* data */}
              </div>
              <span className="study-date">2024.04.10</span>
            </div>
            <div className="autho-header-right">
              <div className="study-info">
                <span>현재 참여자</span>
                <div className="header-participant-container">
                  <div className="header-participant-list"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="participant-container">
            <div className={``}>
              <div className="participant-info-box">
                <span id="participant-message"></span>
                <div className="participant-info-box1">
                  <div className="participant-info">
                    <div className="info-title">닉네임</div>
                    <div className="info-content"></div>
                  </div>
                  <div className="participant-info">
                    <div className="info-title">등급</div>
                    <div className="info-content"></div>
                  </div>
                  <div className="participant-info">
                    <div className="info-title">진단</div>
                    <div className="info-content"></div>
                  </div>
                </div>
              </div>
              <div className="buttons">
                <button className="accept-btn">수락</button>
                <button className="reject-btn">거절</button>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Autho;

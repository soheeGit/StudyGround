import React, { useState, useEffect } from 'react';
import './Autho.css';
import WorkHeader from '../../WorkHeader';

const Autho = () => {
  const [selectedTab, setSelectedTab] = useState('ongoing');
  const [applyList, setApplyList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/applyList');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched applyList data:', data); // Debugging line
        setApplyList(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getFilteredApplyList = () => {
    // Implement any filtering logic if needed based on selectedTab
    return applyList;
  };

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
        <hr />
        {getFilteredApplyList().length > 0 ? (
          getFilteredApplyList().map((studyGroup) => (
            <div className="study-group" key={studyGroup.board.bName}>
              <div className="autho-header-container">
                <div className="autho-header-left">
                  <div className="study-header">
                    <span id="span1">{studyGroup.board.bName}</span>{' '}
                    <span id="span2">{studyGroup.requests.length} </span>
                  </div>
                  <span className="study-date">
                    {new Date(
                      studyGroup.requests[0].createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="autho-header-right">
                  <div className="study-info">
                    <span>현재 참여자</span>
                    <div className="header-participant-container">
                      <div className="header-participant-list">
                        {studyGroup.requests.map((request) => (
                          <div key={request.id}>
                            {request.userId} - {request.status}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {studyGroup.requests.map((request) => (
                <div className="participant-container" key={request.id}>
                  <div className="participant-info-box">
                    <span id="participant-message">{request.status}</span>
                    <div className="participant-info-box1">
                      <div className="participant-info">
                        <div className="info-title">유저 ID</div>
                        <div className="info-content">{request.userId}</div>
                      </div>
                      <div className="participant-info">
                        <div className="info-title">상태</div>
                        <div className="info-content">{request.status}</div>
                      </div>
                    </div>
                  </div>
                  <div className="buttons">
                    <button className="accept-btn">수락</button>
                    <button className="reject-btn">거절</button>
                  </div>
                </div>
              ))}
              <hr />
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
};

export default Autho;

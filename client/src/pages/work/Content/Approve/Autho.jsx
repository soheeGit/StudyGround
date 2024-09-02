import React, { useState, useEffect } from 'react';
import './Autho.css';
import WorkHeader from '../../WorkHeader';
import Sidebar from '../../sidebar/Sidebar';

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
        console.log('Fetched applyList data:', data);
        setApplyList(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getFilteredApplyList = () => {
    return applyList;
  };

  const acceptRequest = async (requestId) => {
    try {
      const response = await fetch(`/api/accept-board/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data.message);
        setApplyList((prevList) =>
          prevList.map((studyGroup) => ({
            ...studyGroup,
            requests: studyGroup.requests.map((request) =>
              request.id === requestId
                ? { ...request, status: '수락됨' }
                : request
            ),
          }))
        );
      } else {
        console.error('Error:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Internal server error');
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      const response = await fetch(`/api/reject-board/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data.message);
        setApplyList((prevList) =>
          prevList.map((studyGroup) => ({
            ...studyGroup,
            requests: studyGroup.requests.map((request) =>
              request.id === requestId
                ? { ...request, status: '거절됨' }
                : request
            ),
          }))
        );
      } else {
        console.error('Error:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Internal server error');
    }
  };

  return (
    <>
      <Sidebar />
      <div className="approve-container">
        <WorkHeader />
        <h1>My</h1>
        <h2 className="subtitle">내 스터디</h2>
        <div className="tab-selector">
          <button
            className={selectedTab === 'ongoing' ? 'active' : ''}
            onClick={() => setSelectedTab('ongoing')}
          >
            모집 진행중
          </button>
        </div>
        <hr />

        {getFilteredApplyList().map((studyGroup) => (
          <div className="study-group" key={studyGroup.board.bName}>
            <div className="autho-header-container">
              <div className="autho-header-left">
                <div className="study-header">
                  <span id="span1">{studyGroup.board.bName}</span>
                </div>
                <span className="study-date">
                  {studyGroup.requests.length > 0 &&
                  studyGroup.requests[0].createdAt
                    ? new Date(
                        studyGroup.requests[0].createdAt
                      ).toLocaleDateString()
                    : 'No request date available'}
                </span>
              </div>
            </div>

            {studyGroup.requests.length > 0 && (
              <div className="part-message">
                <span id="participant-message">스터디 참여를 원합니다.</span>
              </div>
            )}

            {studyGroup.requests.map((request) => (
              <div className="participant-container" key={request.id}>
                <div className="participant-info-box">
                  <div className="participant-info-box1">
                    <div className="participant-info">
                      <div className="info-title">닉네임</div>
                      <div className="info-content">{request.User?.uName}</div>
                    </div>
                    <div className="participant-info">
                      <div className="info-title">등급</div>
                      <div className="info-content">{request.User?.uLevel}</div>
                    </div>
                    <div className="participant-info">
                      <div className="info-title">진단</div>
                      <div className="info-content">{request.User?.uType}</div>
                    </div>
                    <div className="participant-info">
                      <div className="info-title">상태</div>
                      <div className="info-content">{request.status}</div>
                    </div>

                    <div className="buttons">
                      <button
                        className="accept-btn"
                        onClick={() => acceptRequest(request.id)}
                      >
                        수락
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => rejectRequest(request.id)}
                      >
                        거절
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default Autho;

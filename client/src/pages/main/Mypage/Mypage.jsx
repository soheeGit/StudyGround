import React, { useEffect, useState } from 'react';
import Sidebar from '../../work/sidebar/Sidebar';
import './Mypage.css';
import { useNavigate } from 'react-router-dom';
import useUserData from './useUserData';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CA', options);
};

const Mypage = () => {
  const navigate = useNavigate();
  const userData = useUserData();
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await fetch('/api/myBoard', {
          method: 'GET',
          credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
          setBoardData(result);
        } else {
          alert('활동 데이터 불러오기 오류');
        }
      } catch (error) {
        alert('활동 데이터 불러오기 오류: ' + error.message);
      }
    };

    fetchBoardData();
  }, []);

  const handleEditProfileClick = () => {
    navigate('/Mypagemodify');
  };

  return (
    <>
      <Sidebar />
      <div className="mypage_wrap">
        <div className="mypage_title">내 정보</div>
        <div className="mypage_info">
          <div className="profile">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="profile_image"
            />
            <div className="profile_details">
              {userData.uName} ({userData.uId}) <br />
              {userData.uLevel} · {userData.uType}
            </div>
            <button
              className="edit_profile_button"
              onClick={handleEditProfileClick}
            >
              프로필 편집
            </button>
          </div>
        </div>

        <div className="mypage_activities">진행중인 활동</div>
        {boardData.length > 0 ? (
          boardData.map((board) => (
            <div className="activity" key={board.bId}>
              <img
                src="activity_image_url"
                alt={board.bName}
                className="activity_image"
              />
              <p>
                {board.bName} <br /> {formatDate(board.bStartDate)} ~{' '}
                {formatDate(board.bClosingDate)}
              </p>
            </div>
          ))
        ) : (
          <p>진행중인 활동이 없습니다.</p>
        )}

        <div className="mypage_activities">내 활동</div>
        <div className="activity">
          <div className="review-left">
            <img
              src="{review.image}"
              className="review-profile-image"
              alt="Profile"
            />
            <p>이름</p>
          </div>

          <div className="review-right">
            <p>⭐ (별 점수 3.0/5.0)</p>
            <div className="review-tags">
              <span className="review-tag">praise</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;

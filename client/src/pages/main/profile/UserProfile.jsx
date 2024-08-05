// 다른 사용자 프로필 보기 페이지입니다
// 수정해야함
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/profile/otherUserData/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();

        if (response.ok && result.success) {
          setUserData(result.user);
        } else {
          alert(result.message || '사용자 정보 불러오기 오류');
        }
      } catch (error) {
        alert('사용자 정보 불러오기 오류: ' + error.message);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleClose = () => {
    navigate(-1);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-overlay">
      <div className="user-profile-container">
        <button className="close-btn" onClick={handleClose}>
          X
        </button>
        <div className="profile-header">
          <img
            src={userData.profileImage}
            alt={`${userData.uName}'s profile`}
            className="profile-image"
          />
          <h2>{userData.uName}</h2>
        </div>
        <div className="profile-info">
          <div className="info-item">
            <span className="info-title">닉네임:</span>
            <span className="info-content">{userData.uName}</span>
          </div>
          <div className="info-item">
            <span className="info-title">등급:</span>
            <span className="info-content">{userData.uLevel}</span>
          </div>
          <div className="info-item">
            <span className="info-title">진단:</span>
            <span className="info-content">{userData.uType}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

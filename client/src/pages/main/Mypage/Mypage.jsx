import React from 'react';
import Sidebar from '../../work/sidebar/Sidebar';
import './Mypage.css';
import { useNavigate } from 'react-router-dom';
import WorkHeader from '../../work/WorkHeader';

const Mypage = () => {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate('/Mypagemodify');
  };

  const handleDeleteAccountClick = async () => {
    try {
      const response = await fetch('/profile/deleteUser', {
        method: 'GET',
      });

      const result = await response.json();

      if (response.ok) {
        // Handle success response
        alert(result.message);
        navigate('/'); // Navigate to home or login page after account deletion
      } else {
        // Handle error response
        alert(result.message || '회원 탈퇴 오류');
      }
    } catch (error) {
      // Handle network or other errors
      alert('회원 탈퇴 오류: ' + error.message);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="mypage_wrap">
        <div className="mypage_title">내 정보</div>
        <div className="mypage_info">
          <div className="profile">
            <img
              src="profile_image_url"
              alt="Profile"
              className="profile_image"
            />
            <div className="profile_details">
              이름 <br />
              성격유형
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
        <div className="activity">
          <img
            src="lg_project_image_url"
            alt="LG 프로젝트"
            className="activity_image"
          />
          <p>
            LG 프로젝트 <br />
            D-16
          </p>
        </div>
        <div className="activity">
          <img
            src="saemaul_image_url"
            alt="새마을운동 SNS 숏폼 공모전"
            className="activity_image"
          />
          <p>
            새마을운동 SNS 숏폼 공모전
            <br />
            D-9
          </p>
        </div>

        <div className="mypage_activities">내 활동</div>
        <div className="activity">
          <div className="review-left">
            <p>활동기간</p>
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

        <button className="cancel_account" onClick={handleDeleteAccountClick}>
          탈퇴하기
        </button>
      </div>
    </>
  );
};

export default Mypage;

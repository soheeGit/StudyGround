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
  const [reviewData, setReviewData] = useState([]);
  const [ongoingActivities, setOngoingActivities] = useState([]);

  // 내 활동보기
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

    // 내 리뷰 확인
    const fetchReviewData = async () => {
      try {
        const response = await fetch('/profile/myReviewData', {
          method: 'GET',
          credentials: 'include',
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setReviewData(result.reviewResult);
        } else {
          alert(result.message || '내 리뷰 확인 오류');
        }
      } catch (error) {
        alert('내 리뷰 확인 오류: ' + error.message);
      }
    };

    // Fetch ongoing activities
    // const fetchOngoingActivities = async () => {
    //   try {
    //     const response = await fetch('/api/acceptBoardEnter/:id', {
    //       method: 'GET',
    //       credentials: 'include',
    //     });

    //     const result = await response.json();

    //     if (response.ok) {
    //       setOngoingActivities(result);
    //     } else {
    //       alert('진행중인 활동 데이터 불러오기 오류');
    //     }
    //   } catch (error) {
    //     alert('진행중인 활동 데이터 불러오기 오류: ' + error.message);
    //   }
    // };

    fetchBoardData();
    fetchReviewData();
    // fetchOngoingActivities();
  }, []);

  // 프로필 편집
  const handleEditProfileClick = () => {
    navigate('/Mypagemodify');
  };

  // 탈퇴하기
  const handleDeleteUserClick = async () => {
    try {
      const response = await fetch('/profile/deleteUser', {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        navigate('/#');
      } else {
        alert(result.message || '회원 탈퇴 오류');
      }
    } catch (error) {
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
        {ongoingActivities.length > 0 ? (
          ongoingActivities.map((activity) => (
            <div className="activity" key={activity.bId}>
              <img
                src="activity_image_url"
                alt="사진"
                className="activity_image"
              />
              <p>
                {activity.bName} <br />
                {formatDate(activity.bStartDate)} ~{' '}
                {formatDate(activity.bClosingDate)}
              </p>
            </div>
          ))
        ) : (
          <p>진행중인 활동이 없습니다.</p>
        )}

        <div className="mypage_activities">내 활동</div>
        {reviewData.length > 0 ? (
          reviewData.map((board) => (
            <div className="activity" key={board.boardId}>
              <h3>{board.boardName}</h3>
              <p>평균 평점: {board.averageRating.toFixed(1)}</p>
              <div className="reviews">
                {board.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <p>⭐ {review.rating.toFixed(1)} / 5.0</p>
                    <p>{review.content}</p>
                  </div>
                ))}
              </div>
              <div className="praises">
                <h4>칭찬:</h4>
                {board.praises.map((praise, index) => (
                  <span key={index} className="praise-tag">
                    {praise}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>내 활동이 없습니다.</p>
        )}
        <div className="mydeleteuser">
          <button className="mydelete" onClick={handleDeleteUserClick}>
            탈퇴하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Mypage;

import React, { useEffect, useState } from 'react';
import Sidebar from '../../work/sidebar/Sidebar';
import './Mypage.css';
import { useNavigate } from 'react-router-dom';
import useUserData from './useUserData';
import WorkHeader from '../../work/WorkHeader';

const Mypage = () => {
  const navigate = useNavigate();
  const userData = useUserData();
  const [activities, setActivities] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [showMore, setShowMore] = useState({});

  const toggleShowMore = (boardId) => {
    setShowMore((prev) => ({ ...prev, [boardId]: !prev[boardId] }));
  };

  // Fetch ongoing activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/myBoard', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          setActivities(result);
        } else {
          console.error('Failed to fetch activities');
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/profile/myReviewData', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result); // Log the response to inspect the data

          if (result.success) {
            setReviewData(result.reviewResult);
          } else {
            console.error(result.message || 'Failed to fetch reviews');
          }
        } else {
          const errorResult = await response.json();
          console.error(errorResult.error || 'Error fetching reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  // Edit profile
  const handleEditProfileClick = () => {
    navigate('/Mypagemodify');
  };

  // Delete user
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

  // Navigate to study acceptance/rejection page
  const handleAccrejStudyClick = () => {
    navigate('/Autho');
  };

  return (
    <>
      <Sidebar />
      <div className="mypage_wrap">
        <WorkHeader />
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
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.bId} className="activity">
              <p>
                <b>{activity.bName}</b> <br />
                <br />
                {new Date(activity.bStartDate).toLocaleDateString()} ~{' '}
                {new Date(activity.bClosingDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>진행중인 활동이 없습니다.</p>
        )}

        <div className="studyingbutton">
          <button className="accrej_study" onClick={handleAccrejStudyClick}>
            신청 목록
          </button>
        </div>

        <div className="mypage_activities">내 리뷰</div>
        {reviewData.length > 0 ? (
          reviewData.map((board) => (
            <div key={board.boardId} className="review_board">
              <div className="review_left">{board.boardName}</div>
              <div className="review_right">
                <div className="average_rating">
                  ⭐ {board.averageRating.toFixed(1)} / 5
                </div>

                {board.praises.length > 0 && (
                  <div
                    className={`review_praises ${
                      showMore[board.boardId] ? 'show-more' : ''
                    }`}
                  >
                    <ul>
                      {board.praises.map((praise, index) => (
                        <li key={index}>{praise}</li>
                      ))}
                    </ul>
                    <button
                      className="toggle-button"
                      onClick={() => toggleShowMore(board.boardId)}
                    >
                      {showMore[board.boardId] ? '접기' : '더보기'}
                    </button>
                  </div>
                )}

                {showMore[board.boardId] && (
                  <div className="review_content">
                    <div className="review_contentname">팀원들의 한줄평</div>
                    <hr />
                    {board.reviews.map((review, index) => (
                      <div key={index}>{review.content}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>리뷰가 없습니다.</p>
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

import React, { useEffect, useState } from 'react';
import './profile.css';
import WorkHeader from '../../work/WorkHeader';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import useUserData from '../Mypage/useUserData';

const Profile = () => {
  const [reviewData, setReviewData] = useState([]);
  const [showMore, setShowMore] = useState({});
  const userData = useUserData();

  const toggleShowMore = (boardId) => {
    setShowMore((prev) => ({ ...prev, [boardId]: !prev[boardId] }));
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/profile/myReviewData', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();

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

  return (
    <>
      <div className="addwrap">
        <div className="addlogo">
          <Link to="/LoginAfter" className="logoLink">
            <img
              className="logoBox"
              width="100px"
              height="85px"
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className="addWorkHeader">
          <WorkHeader />
        </div>
      </div>
      <div className="divider"></div>

      <div className="profile-profile-container">
        <div className="top_profile_info">
          <div className="top_profile">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="top_profile_image"
            />
            <div className="top_profile_details">
              <div className="details1">
                <span className="nickname">
                  <b>닉네임 </b>
                </span>{' '}
                {userData.uId}
              </div>
              <div className="details1">
                <span className="nickname">
                  <b>유형 </b>{' '}
                </span>{' '}
                {userData.uType}
              </div>
            </div>
          </div>
        </div>
        {reviewData.length > 0 ? (
          reviewData.map((board) => (
            <div key={board.boardId} className="profile_board">
              <div className="profile_left">{board.boardName}</div>
              <div className="profile_right">
                <div className="profile_rating">
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
                      className="profile_toggle-button"
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
      </div>
    </>
  );
};

export default Profile;

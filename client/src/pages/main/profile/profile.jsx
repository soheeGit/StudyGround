import React, { useState } from 'react';
import './profile.css';
import WorkHeader from '../../work/WorkHeader';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const reviews = [
  {
    id: 1,
    date: '2 weeks ago',
    name: '문서 스터디',
    rating: '3.8 / 5.0',
    tags: ['일정이 마음에 들어요', '상세해요', '질문이 좋아요'],
    details: ['팀원들의 한줄평', '팀원 A', '팀원 B', '팀원 C', '팀원 D'],
    image: require('../../../assets/profile_img1.png'),
  },
  {
    id: 2,
    date: '2 months ago',
    name: 'OPIC STUDY',
    rating: '4.0 / 5.0',
    tags: ['일정이 마음에 들어요', '주도적이에요', '리더십이 있어요'],
    details: ['팀원들의 한줄평', '팀원 A', '팀원 B', '팀원 C', '팀원 D'],
    image: require('../../../assets/profile_img2.png'),
  },
  {
    id: 3,
    date: '3 months ago',
    name: 'LG 프로젝트',
    rating: '4.3 / 5.0',
    tags: [
      '일정이 마음에 들어요',
      '주도적이에요',
      '리더십이 있어요',
      '공감해요',
      '상세해요',
    ],
    details: ['팀원들의 한줄평', '팀원 A', '팀원 B', '팀원 C', '팀원 D'],
    image: require('../../../assets/profile_img3.png'),
  },
];

const Profile = () => {
  const [expandedReview, setExpandedReview] = useState(null);

  const toggleReview = (id) => {
    setExpandedReview(expandedReview === id ? null : id);
  };

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
      <div className="review-profile-container">
        <div className="profile-left">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-left">
                  <p>{review.date}</p>
                  <img
                    src={review.image}
                    className="review-profile-image"
                    alt="Profile"
                  />
                  <p>{review.name}</p>
                </div>
                <div className="review-right">
                  <p>⭐ {review.rating}</p>
                  <div className="review-tags">
                    {review.tags.map((tag, index) => (
                      <span key={index} className="review-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                className="review-button"
                onClick={() => toggleReview(review.id)}
              >
                {expandedReview === review.id ? '접기' : '더보기'}
              </button>
              {expandedReview === review.id && (
                <div className="review-details">
                  {review.details.map((detail, index) => (
                    <p key={index}>{detail}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;

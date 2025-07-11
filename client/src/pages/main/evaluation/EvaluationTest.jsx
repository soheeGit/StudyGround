import React, { useState, useEffect } from 'react';
import './EvaluationTest.css';
import WorkHeader from '../../work/WorkHeader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const EvaluationTest = () => {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await fetch(`/api/partBoards/${boardId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch board data');
        }
        const data = await response.json();
        setBoardData(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchBoardData();
  }, [boardId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/reviews/getName/${boardId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUsers(data.users);

        setReviews(
          data.users.map((user) => ({
            userId: user.id,
            rating: 0,
            comments: '',
            compliments: {
              fastResponse: false,
              proactive: false,
              leadership: false,
              creativity: false,
              diligent: false,
              punctual: false,
              detailOriented: false,
              sincere: false,
            },
          }))
        );
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchUsers();
  }, [boardId]);

  const handleRatingChange = (index, rating) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].rating = rating;
    setReviews(updatedReviews);
  };

  const handleCommentsChange = (index, e) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].comments = e.target.value;
    setReviews(updatedReviews);
  };

  const handleComplimentsChange = (index, e) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].compliments[e.target.name] = e.target.checked;
    setReviews(updatedReviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reviewData = reviews.map((review) => ({
        revieweeIds: [review.userId],
        rating: review.rating,
        content: review.comments,
        praises: Object.keys(review.compliments)
          .filter((key) => review.compliments[key])
          .map((key) => {
            const labels = {
              fastResponse: '답장이 빨라요',
              proactive: '열정적이에요',
              leadership: '주도적이에요',
              creativity: '창의적이에요',
              diligent: '리더십이 있어요',
              punctual: '시간약속을 잘 지켜요',
              detailOriented: '꼼꼼한 성격을 가졌어요',
              sincere: '성실해요',
            };
            return labels[key];
          }),
      }));

      await Promise.all(
        reviewData.map((data) =>
          fetch(`/reviews/submit/${boardId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
          })
        )
      );

      setSuccessMessage('리뷰가 성공적으로 저장되었습니다.');
      setErrorMessage('');
      alert('리뷰가 성공적으로 저장되었습니다.');
      navigate('/LoginAfter');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.message || '리뷰 저장 중 오류가 발생했습니다.');
    }
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
      <div className="evaluation-container">
        {boardData ? (
          <form onSubmit={handleSubmit}>
            <h1>{boardData.bName}</h1>

            <div className="team-select">
              <label htmlFor="team1">팀원 상호평가</label>
              <p>
                팀원들을 솔직하게 평가해주세요. <br /> 다음 스터디를 진행할 때
                타인들이 볼 수 있는 평가표입니다.
              </p>
            </div>

            {users.map((user, index) => (
              <div key={user.id} className="user-review-section">
                <div className="team-name">
                  <label htmlFor={`team_${index}`}>{user.uName}님 </label>
                </div>

                <div className="rating-section">
                  <label>
                    별점<span className="red-asterisk"> *</span>
                  </label>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${
                          reviews[index].rating >= star ? 'selected' : ''
                        }`}
                        onClick={() => handleRatingChange(index, star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="compliments-section">
                  <label>칭찬멘트</label>
                  <div className="compliments-options">
                    {[
                      { name: 'fastResponse', label: '답장이 빨라요.' },
                      { name: 'proactive', label: '열정적이에요.' },
                      { name: 'leadership', label: '주도적이에요.' },
                      { name: 'creativity', label: '창의적이에요.' },
                      { name: 'diligent', label: '리더십이 있어요.' },
                      { name: 'punctual', label: '시간약속을 잘 지켜요.' },
                      {
                        name: 'detailOriented',
                        label: '꼼꼼한 성격을 가졌어요.',
                      },
                      { name: 'sincere', label: '성실해요.' },
                    ].map((compliment) => (
                      <div key={compliment.name} className="compliment-option">
                        <input
                          type="checkbox"
                          name={compliment.name}
                          id={`form_${index}_${compliment.name}`}
                          checked={reviews[index].compliments[compliment.name]}
                          onChange={(e) => handleComplimentsChange(index, e)}
                        />
                        <label htmlFor={`form_${index}_${compliment.name}`}>
                          {compliment.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="comments-section">
                  <label htmlFor={`comments_${index}`}>한줄평 남기기</label>
                  <textarea
                    id={`comments_${index}`}
                    value={reviews[index].comments}
                    onChange={(e) => handleCommentsChange(index, e)}
                    placeholder="ex) 전반적으로 주도적이셔서 도움을 많이 받았고, 어떻게 하면 효율적으로 공부를 해야하는지도 알아갔습니다. :)"
                  />
                </div>
              </div>
            ))}

            <button type="submit" className="submit-btn">
              저장
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default EvaluationTest;

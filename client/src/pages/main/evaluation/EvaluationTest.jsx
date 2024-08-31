import React, { useState, useEffect } from 'react';
import './EvaluationTest.css';
import WorkHeader from '../../work/WorkHeader';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { useNavigate, useParams } from 'react-router-dom';

const EvaluationTest = () => {
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [users, setUsers] = useState([]);

  const [form1Rating, setForm1Rating] = useState(0);
  const [form1Comments, setForm1Comments] = useState('');
  const [form1Compliments, setForm1Compliments] = useState({
    fastResponse: false,
    proactive: false,
    leadership: false,
    creativity: false,
    diligent: false,
    punctual: false,
    detailOriented: false,
    sincere: false,
  });
  const [selectedUserIdForm1, setSelectedUserIdForm1] = useState(null);

  const [form2Rating, setForm2Rating] = useState(0);
  const [form2Comments, setForm2Comments] = useState('');
  const [form2Compliments, setForm2Compliments] = useState({
    fastResponse: false,
    proactive: false,
    leadership: false,
    creativity: false,
    diligent: false,
    punctual: false,
    detailOriented: false,
    sincere: false,
  });
  const [selectedUserIdForm2, setSelectedUserIdForm2] = useState(null);

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
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchUsers();
  }, [boardId]);

  const handleForm1Rating = (rate) => setForm1Rating(rate);
  const handleForm1Comments = (e) => setForm1Comments(e.target.value);
  const handleForm1Compliments = (e) => {
    setForm1Compliments({
      ...form1Compliments,
      [e.target.name]: e.target.checked,
    });
  };
  const handleUserChangeForm1 = (e) => setSelectedUserIdForm1(e.target.value);

  const handleForm2Rating = (rate) => setForm2Rating(rate);
  const handleForm2Comments = (e) => setForm2Comments(e.target.value);
  const handleForm2Compliments = (e) => {
    setForm2Compliments({
      ...form2Compliments,
      [e.target.name]: e.target.checked,
    });
  };
  const handleUserChangeForm2 = (e) => setSelectedUserIdForm2(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitReview = async (userId, rating, comments, compliments) => {
      const praises = Object.keys(compliments)
        .filter((key) => compliments[key])
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
        });

      try {
        const response = await fetch(`/reviews/submit/${boardId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            revieweeId: userId,
            rating: rating,
            content: comments,
            praises: praises,
          }),
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error);
        }
      } catch (error) {
        throw error;
      }
    };

    try {
      if (selectedUserIdForm1) {
        await submitReview(
          selectedUserIdForm1,
          form1Rating,
          form1Comments,
          form1Compliments
        );
      }

      if (selectedUserIdForm2) {
        await submitReview(
          selectedUserIdForm2,
          form2Rating,
          form2Comments,
          form2Compliments
        );
      }

      setSuccessMessage('리뷰가 성공적으로 저장되었습니다.');
      setErrorMessage('');
      alert('리뷰가 성공적으로 저장되었습니다.');
      navigate('/LoginAfter');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.message);
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
              <select
                id="team1"
                onChange={handleUserChangeForm1}
                value={selectedUserIdForm1}
              >
                <option value="">팀원 선택</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.uName}
                  </option>
                ))}
              </select>
            </div>

            <div className="rating-section">
              <label>
                별점<span className="red-asterisk"> *</span>
              </label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${form1Rating >= star ? 'selected' : ''}`}
                    onClick={() => handleForm1Rating(star)}
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
                      id={`form1_${compliment.name}`}
                      checked={form1Compliments[compliment.name]}
                      onChange={handleForm1Compliments}
                    />
                    <label htmlFor={`form1_${compliment.name}`}>
                      {compliment.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="comments-section">
              <label htmlFor="comments1">한줄평 남기기</label>
              <textarea
                id="comments1"
                value={form1Comments}
                onChange={handleForm1Comments}
                placeholder="ex) 전반적으로 주도적이셔서 도움을 많이 받았고, 어떻게 하면 효율적으로 공부를 해야하는지도 알아갔습니다. :)"
              />
            </div>

            <div className="team-select">
              <select
                id="team2"
                onChange={handleUserChangeForm2}
                value={selectedUserIdForm2}
              >
                <option value="">팀원 선택</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.uName}
                  </option>
                ))}
              </select>
            </div>

            <div className="rating-section">
              <label>
                별점<span className="red-asterisk"> *</span>
              </label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${form2Rating >= star ? 'selected' : ''}`}
                    onClick={() => handleForm2Rating(star)}
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
                      id={`form2_${compliment.name}`}
                      checked={form2Compliments[compliment.name]}
                      onChange={handleForm2Compliments}
                    />
                    <label htmlFor={`form2_${compliment.name}`}>
                      {compliment.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="comments-section">
              <label htmlFor="comments2">한줄평 남기기</label>
              <textarea
                id="comments2"
                value={form2Comments}
                onChange={handleForm2Comments}
                placeholder="ex) 전반적으로 주도적이셔서 도움을 많이 받았고, 어떻게 하면 효율적으로 공부를 해야하는지도 알아갔습니다. :)"
              />
            </div>

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

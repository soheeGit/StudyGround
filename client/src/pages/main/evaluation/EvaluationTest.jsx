import React, { useState } from 'react';
import './EvaluationTest.css';
import WorkHeader from '../../work/WorkHeader';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { useNavigate, useParams } from 'react-router-dom';

const EvaluationTest = () => {
  const { boardId } = useParams(); // Get boardId from URL parameters
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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleForm1Rating = (rate) => setForm1Rating(rate);
  const handleForm1Comments = (e) => setForm1Comments(e.target.value);
  const handleForm1Compliments = (e) => {
    setForm1Compliments({
      ...form1Compliments,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmitForm1 = async (e) => {
    e.preventDefault();

    const praises = Object.keys(form1Compliments)
      .filter((key) => form1Compliments[key])
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
          revieweeId: 1,
          rating: form1Rating,
          content: form1Comments,
          praises: praises,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('리뷰가 성공적으로 저장되었습니다.');
        setErrorMessage('');
        alert('리뷰가 성공적으로 저장되었습니다.');
        navigate('/LoginAfter');
      } else {
        throw new Error(result.error);
      }
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
        <h1>OPIC study for AL</h1>
        <form onSubmit={handleSubmitForm1}>
          <div className="team-select">
            <label htmlFor="team">팀원 상호평가</label>
            <p>
              팀원들을 솔직하게 평가해주세요. <br /> 다음 스터디를 진행할 때
              타인들이 볼 수 있는 평가표입니다.
            </p>
            <select id="team">
              <option value="team1">김모씨</option>
              <option value="team2">윤모씨</option>
              <option value="team3">이모씨</option>
            </select>
          </div>
          <div className="rating-section">
            <label>별점 *</label>
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
                { name: 'detailOriented', label: '꼼꼼한 성격을 가졌어요.' },
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
            <label htmlFor="comments">한줄평 남기기</label>
            <textarea
              id="comments"
              value={form1Comments}
              onChange={handleForm1Comments}
              placeholder="ex) 전반적으로 주도적이셔서 도움을 많이 받았고, 어떻게 하면 효율적으로 공부를 해야하는지도 알아갔습니다. :)"
            ></textarea>
          </div>
          <button className="reviewbutton" type="submit">
            저장하기
          </button>
        </form>
      </div>
    </>
  );
};

export default EvaluationTest;

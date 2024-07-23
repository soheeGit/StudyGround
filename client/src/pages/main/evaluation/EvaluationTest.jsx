import React, { useState } from 'react';
import './EvaluationTest.css';

const EvaluationTest = () => {
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

  // const [form2Rating, setForm2Rating] = useState(0);
  // const [form2Comments, setForm2Comments] = useState('');
  // const [form2Compliments, setForm2Compliments] = useState({
  //   fastResponse: false,
  //   proactive: false,
  //   leadership: false,
  //   creativity: false,
  //   diligent: false,
  //   punctual: false,
  //   detailOriented: false,
  //   sincere: false,
  // });

  const handleForm1Rating = (rate) => setForm1Rating(rate);
  const handleForm1Comments = (e) => setForm1Comments(e.target.value);
  const handleForm1Compliments = (e) => {
    setForm1Compliments({
      ...form1Compliments,
      [e.target.name]: e.target.checked,
    });
  };

  // const handleForm2Rating = (rate) => setForm2Rating(rate);
  // const handleForm2Comments = (e) => setForm2Comments(e.target.value);
  // const handleForm2Compliments = (e) => {
  //   setForm2Compliments({
  //     ...form2Compliments,
  //     [e.target.name]: e.target.checked,
  //   });
  // };

  const handleSubmitForm1 = (e) => {
    e.preventDefault();
    console.log({ rating: form1Rating, comments: form1Comments, compliments: form1Compliments });
  };

  // const handleSubmitForm2 = (e) => {
  //   e.preventDefault();
  //   console.log({ rating: form2Rating, comments: form2Comments, compliments: form2Compliments });
  // };

  return (
    <div className="evaluation-container">
      <h1>OPIC study for AL</h1>
      <form onSubmit={handleSubmitForm1}>
        {/* Form 1 */}
        <div className="team-select">
          <label htmlFor="team">팀원 상호평가</label>
          <p>팀원들을 솔직하게 평가해주세요. <br/> 다음 스터디를 진행할 때 타인들이 볼 수 있는 평가표입니다.</p>
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
              { name: 'creativity', label: '시간약속을 잘지켜요.' },
              { name: 'diligent', label: '리더십이 있어요.' },
              { name: 'punctual', label: '꼼꼼한 성격을 가졌어요.' },
              { name: 'detailOriented', label: '창의적이에요.' },
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
                <label htmlFor={`form1_${compliment.name}`}>{compliment.label}</label>
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
      </form>

      {/* <form onSubmit={handleSubmitForm2}>
        <div className="team-select">
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
              { name: 'creativity', label: '시간약속을 잘지켜요.' },
              { name: 'diligent', label: '리더십이 있어요.' },
              { name: 'punctual', label: '꼼꼼한 성격을 가졌어요.' },
              { name: 'detailOriented', label: '창의적이에요.' },
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
                <label htmlFor={`form2_${compliment.name}`}>{compliment.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="comments-section">
          <label htmlFor="comments">한줄평 남기기</label>
          <textarea
            id="comments"
            value={form2Comments}
            onChange={handleForm2Comments}
            placeholder="ex) 전반적으로 주도적이셔서 도움을 많이 받았고, 어떻게 하면 효율적으로 공부를 해야하는지도 알아갔습니다. :)"
          ></textarea>
        </div>
        <button type="submit">저장하기</button>
      </form> */}
    </div>
  );
};

export default EvaluationTest;

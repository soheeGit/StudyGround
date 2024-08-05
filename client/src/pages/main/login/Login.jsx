import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import kakao from '../../../assets/kakao.png';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const requestBody = {
      uId: userId,
      uPassword: password,
    };

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('로그인 성공:', data);
        localStorage.setItem('user', JSON.stringify(data)); // Save user data to local storage
        console.log('User data saved to localStorage:', data);
        navigate('/LoginAfter', { state: { uId: data.uId } });
      } else {
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:5000/auth/kakao';
  };

  return (
    <div className="page">
      <div className="titleWrap">
        <b>Study Ground</b>
        <br />
        <p>다양한 스터디에 참여하려면 가입해주세요.</p>
      </div>

      <div className="contentWrap">
        <input
          type="text"
          className="idpw"
          placeholder="사용자 아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="contentWrap">
        <input
          type="password"
          className="idpw"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button className="bottomButton" onClick={handleLogin}>
          로그인
        </button>
      </div>

      <div className="mid">
        <div className="find">ID / PW 찾기</div>
        <p>|</p>
        <Link to="/JoinupForm" className="add">
          회원가입
        </Link>
      </div>

      <div className="line">
        <p>----------------------- 또는 ------------------------</p>
      </div>

      <div>
        <button className="kakaoButton" onClick={handleKakaoLogin}>
          <img src={kakao} width="28px" alt="Kakao" /> 카카오톡으로 로그인
        </button>
      </div>
    </div>
  );
}

export default Login;

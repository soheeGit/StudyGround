import './Login.css';
import kakao from '../../../assets/kakao.png';
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="page">
      <div className="titleWrap">
        <b>Study Ground</b>
        <br />
        <p>다양한 스터디에 참여하려면 가입해주세요.</p>
      </div>

      <div className="contentWrap">
        <input type="text" className="idpw" placeholder="사용자 아이디 또는 이메일" />
      </div>
      <div className="contentWrap">
        <input type="text" className="idpw" placeholder="비밀번호" />
      </div>

      <div>
        <button className='bottomButton'>로그인</button>
      </div>

      <div className="mid">
        <div className="find">ID / PW 찾기</div>
        <p>|</p>
        <Link to="/JoinupForm" className="add">회원가입</Link>
      </div>

      <div className="line">
        <p>----------------------- 또는 ------------------------</p>
      </div>

      <div>
        <button className="kakaoButton">
          <img src={kakao} width="28px" /> 카카오톡으로 로그인
        </button>
      </div>
    </div>
  );
}

export default Login;

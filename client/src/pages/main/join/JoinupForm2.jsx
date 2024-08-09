import React, { useState } from 'react';
import './JoinupForm2.css';
import Top1 from '../screen/Top1';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function JoinupForm2() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    birthDate: '',
    uType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        uId: formData.id,
        uEmail: formData.email,
        uPassword: formData.password,
        uName: formData.name,
        uNumber: formData.phoneNumber,
        uBirth: formData.birthDate,
        uSex: formData.gender,
        uType: formData.uType,
      };

      const response = await axios.post('/auth/join', requestBody);

      console.log('API response:', response.data);

      navigate('/test');

      setFormData({
        id: '',
        password: '',
        passwordConfirm: '',
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        birthDate: '',
        uType: '',
      });
    } catch (error) {
      console.error('API error:', error);
    }
  };

  return (
    <div className="Joinup-form-wrap">
      <Top1 />
      <div className="joinup-form-container">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="userInputFrame">
            <div className="input-group">
              <div className="joinupInput-name">아이디*</div>
              <input
                type="text"
                placeholder="6자 이상의 영문 혹은 영문과 숫자 조합"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <div className="joinupInput-name">비밀번호*</div>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <div className="joinupInput-name">비밀번호 확인*</div>
              <input
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <div className="joinupInput-name">이름*</div>
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <div className="joinupInput-name">이메일*</div>
              <input
                type="text"
                placeholder="예: studyground@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <div className="joinupInput-name">전화번호*</div>
              <input
                type="tel"
                placeholder="숫자를 입력해주세요"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <div className="joinupInput-name">생년월일</div>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <div className="joinupInput-name">성별*</div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="남자"
                  onChange={handleChange}
                />
              </label>
              <p>남자</p>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="여자"
                  onChange={handleChange}
                />
              </label>
              <p>여자</p>
            </div>
          </div>
          <button type="submit" className="JoinupForm-next">
            다음단계
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinupForm2;

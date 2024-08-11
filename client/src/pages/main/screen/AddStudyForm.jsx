import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../screen/Top.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import '../screen/AddStudyForm.css';
import WorkHeader from '../../work/WorkHeader';

const categoryOptions = [
  '어학',
  '취업',
  '고시/공무원',
  '프로그래밍',
  '취미/교양',
  '기타',
];

const AddStudyForm = () => {
  const [formData, setFormData] = useState({
    bName: '',
    bDescription: '',
    bTotalNumber: '',
    bType: '',
    bStartDate: '',
    bClosingDate: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/submitBoard', {
        ...formData,
        bTotalNumber: parseInt(formData.bTotalNumber),
        bStartDate: new Date(formData.bStartDate).toISOString(),
        bClosingDate: new Date(formData.bClosingDate).toISOString(),
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.success) {
        alert('스터디 추가 성공');
        navigate('/LoginAfter');
      }
    } catch (error) {
      console.error('스터디 추가하는 중 오류:', error);
      alert('스터디 추가 실패');
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

      <div className="addf">
        <b>스터디 생성</b>
      </div>

      <div className="aformContainer">
        <form className="addstudyform" onSubmit={handleSubmit}>
          <label className="studylabel">
            스터디 이름<span className="red-asterisk">*</span>
            <input
              className="studyinput"
              type="text"
              name="bName"
              value={formData.bName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            스터디 간단소개<span className="red-asterisk">*</span>
            <input
              className="studyinput"
              type="text"
              name="bDescription"
              value={formData.bDescription}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            총 인원<span className="red-asterisk">*</span>
            <select
              className="studyinput"
              name="bTotalNumber"
              value={formData.bTotalNumber}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                인원 수 선택
              </option>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </label>
          <br />
          <div>
            카테고리<span className="red-asterisk">*</span>
            {categoryOptions.map((category) => (
              <label key={category} className="radio-label">
                <input
                  type="radio"
                  name="bType"
                  value={category}
                  checked={formData.bType === category}
                  onChange={handleChange}
                />
                {category}
              </label>
            ))}
          </div>
          <br />
          <label>
            스터디 시작일<span className="red-asterisk">*</span>
            <input
              className="studyinput"
              type="date"
              name="bStartDate"
              value={formData.bStartDate}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            스터디 마감일<span className="red-asterisk">*</span>
            <input
              className="studyinput"
              type="date"
              name="bClosingDate"
              value={formData.bClosingDate}
              onChange={handleChange}
              required
            />
          </label>
          <button className="studybutton" type="submit">
            생성하기
          </button>
        </form>
      </div>
    </>
  );
};

export default AddStudyForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../screen/Top.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import '../screen/AddStudyForm.css';
import WorkHeader from '../../work/WorkHeader';

const AddStudyForm = () => {
  const [formData, setFormData] = useState({
    bName: '',
    bDescription: '',
    bTotalNumber: '',
    bType: '',
    bStartDate: '',
    bClosingDate: ''
  });

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  const userName = userData ? userData.uId : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/boards', {
        bId: 1, 
        ...formData,
        bTotalNumber: parseInt(formData.bTotalNumber),
        bStartDate: new Date(formData.bStartDate).toISOString(),
        bClosingDate: new Date(formData.bClosingDate).toISOString(),
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.success) {
        alert('스터디 추가 성공');
        navigate('/#');
      }
    } catch (error) {
      console.error('스터디 추가하는 중 오류:', error);
      alert('스터디 추가 실패');
    }
  };

  return (
    <>
      <div className="wrap">
        <div className="logo">
          <Link to="/#" className="logoLink">
            <img className='logoBox' width="100px" height="85px" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="menu" style={{ fontFamily: 'Imprima, sans-serif' }}>
          <Link to="/Work" className="navigation">Work</Link>
          <Link to="/Recruitment" className="navigation">Recruitment</Link>
          <Link to="/Notice" className="navigation">Notice</Link>
          <Link to="/About" className="navigation">About</Link>
        </div>
        <WorkHeader /> 
      </div>
      <div className="divider"></div>
      
      <div className="aformContainer">
          <form className="addstudyform" onSubmit={handleSubmit}>
            <label className='studylabel'>
              스터디 이름:
              <input className='studyinput' type="text" name="bName" value={formData.bName} onChange={handleChange} required />
            </label>
            <br />
            <label>
              설명:
              <input className='studyinput' type="text" name="bDescription" value={formData.bDescription} onChange={handleChange} required />
            </label>
            <br />
            <label>
              총 인원:
              <input className='studyinput' type="number" name="bTotalNumber" value={formData.bTotalNumber} onChange={handleChange} required />
            </label>
            <br />
            <label>
              타입:
              <input className='studyinput' type="text" name="bType" value={formData.bType} onChange={handleChange} required />
            </label>
            <br />
            <label>
              시작 날짜:
              <input className='studyinput' type="date" name="bStartDate" value={formData.bStartDate} onChange={handleChange} required />
            </label>
            <br />
            <label>
              종료 날짜:
              <input className='studyinput' type="date" name="bClosingDate" value={formData.bClosingDate} onChange={handleChange} required />
            </label>
            <button className='studybutton' type="submit">추가</button>
          </form>
        </div>
    </>
  );
};

export default AddStudyForm;

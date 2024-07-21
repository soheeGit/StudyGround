import React, { useState, useEffect } from 'react';
import './WorkHeader.css';
import Avatar from 'antd/es/avatar/avatar';
import { BellOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const WorkHeader = ({ title }) => {
  const [userName, setUserName] = useState('찐감자');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserName(storedUser.user.uName); // Retrieve uId from localStorage
      console.log('User data retrieved from localStorage:', storedUser);
    } else {
      console.log(
        'No user data found in localStorage. Redirecting to login page.'
      );
      navigate('/#');
    }
  }, [navigate]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log('User logged out.');
    navigate('/#');
  };

  return (
    <div className="work-header-container">
      <div className="header-left">
        <h1>{title}</h1>
      </div>
      <div className="header-right">
        <div className="profile-container" onClick={toggleDropdown}>
          <div className="profile-img">
            <Avatar groupBorderColors />
          </div>
          <div className="profile">
            {userName}님
            <CaretDownOutlined />
          </div>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={handleProfileClick}>프로필 보기</li>
                <li>설정</li>
                <li onClick={handleLogout}>로그아웃</li>
              </ul>
            </div>
          )}
        </div>
        <div className="alarm-container">
          <BellOutlined style={{ fontSize: '25px' }} />
        </div>
      </div>
    </div>
  );
};

export default WorkHeader;

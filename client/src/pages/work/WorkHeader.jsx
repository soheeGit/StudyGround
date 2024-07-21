import React, { useState, useEffect } from 'react';
import './WorkHeader.css';
import Avatar from 'antd/es/avatar/avatar';
import { BellOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const WorkHeader = () => {
  const [userId, setUserId] = useState('찐감자');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // localStorage 부분 주석 처리
  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));
  //   if (storedUser) {
  //     setUserId(storedUser.uId); // Retrieve uId from localStorage
  //     console.log('User data retrieved from localStorage:', storedUser); 
  //   } else {
  //     console.log('No user data found in localStorage. Redirecting to login page.');
  //     navigate('/#'); 
  //   }
  // }, [navigate]);
  
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

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/auth/logout', { // Ensure this URL is correct
  //       method: 'GET',
  //       credentials: 'include', // Include credentials if your backend requires them
  //     });
  
  //     if (response.ok) {
  //       localStorage.removeItem('user');
  //       console.log('User logged out.');
  //       navigate('/#');
  //     } else {
  //       console.error('Failed to log out. Status:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('An error occurred during logout:', error);
  //   }
  // };

  return (
    <div className="header-container">
      <div className="profile-container" onClick={toggleDropdown}>
        <div className="profile-img">
          <Avatar />
        </div>
        <div className="profile">
          {userId}님
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
  );
};

export default WorkHeader;

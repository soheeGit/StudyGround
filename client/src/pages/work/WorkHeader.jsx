import React, { useState, useEffect } from 'react';
import './WorkHeader.css';
import Avatar from 'antd/es/avatar';
import { BellOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import useUserData from '../main/Mypage/useUserData';

const WorkHeader = ({ title }) => {
  const [userName, setUserName] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useUserData();

  useEffect(() => {
    const fetchUserData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const userDataString = queryParams.get('user');

      if (userDataString) {
        try {
          const userData = JSON.parse(decodeURIComponent(userDataString));
          localStorage.setItem('user', JSON.stringify(userData));
          setUserName(userData.uName || userData.user.uName);
          console.log('User data saved to localStorage:', userData);
          navigate('/LoginAfter');
        } catch (error) {
          console.error('Error parsing user data from URL:', error);
        }
      } else {
        handleStoredUser();
      }
    };

    const handleStoredUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        const userName = storedUser.uName || storedUser.user?.uName;
        if (userName) {
          setUserName(userName);
        } else {
          console.error('유효한 사용자 이름을 찾을 수 없습니다.');
          navigate('/#');
        }
      } else {
        console.log('사용자 데이터를 찾을 수 없음. 메인화면으로 돌아감');
        navigate('/#');
      }
    };

    fetchUserData();
  }, [location, navigate]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfileClick = () => {
    navigate('/Mypage');
  };

  const handleBellClick = () => {
    navigate('/Autho');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', { method: 'GET' });
      if (response.ok) {
        localStorage.removeItem('user');
        console.log('로그아웃');
        navigate('/#');
      } else {
        console.error('로그아웃 실패:', response.statusText);
      }
    } catch (error) {
      console.error('로그아웃 하는 중 오류:', error);
    }
  };

  return (
    <div className="work-header-container">
      <div className="header-left">
        <h1>{title}</h1>
      </div>
      <div className="header-right">
        <div className="profile-container" onClick={toggleDropdown}>
          <div className="profile-img">
            <Avatar src={userData.profileImage} alt="프로필 사진" />
          </div>
          <div className="profile">
            {userName}님
            <CaretDownOutlined />
          </div>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={handleProfileClick}>프로필 보기</li>
                <li onClick={handleLogout}>로그아웃</li>
              </ul>
            </div>
          )}
        </div>
        <div className="alarm-container" onClick={handleBellClick}>
          <BellOutlined style={{ fontSize: '25px' }} />
        </div>
      </div>
    </div>
  );
};

export default WorkHeader;

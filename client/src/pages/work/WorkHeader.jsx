/* work페이지 상단의 공통적인 header입니다. 프로필 아이콘, 알림 아이콘등이 해당됩니다. */

import React, { useState } from 'react';
import './WorkHeader.css';
import Avatar from 'antd/es/avatar/avatar';
import { BellOutlined, CaretDownOutlined } from '@ant-design/icons';

const WorkHeader = () => {
  const [image, setImage] = useState();
  const [userName, setUserName] = useState('심재혁');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="header-container">
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
              <li>프로필 보기</li>
              <li>설정</li>
              <li>로그아웃</li>
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

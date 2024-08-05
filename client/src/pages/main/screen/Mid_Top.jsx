// 로그인 전 Mid
import './Mid_Top.css';
import CustomModal2 from '../Modal/Modal2';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Mid_Top() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(''); // 새로운 state 추가
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return false;
  };

  const handleAddStudyClick = () => {
    if (isLoggedIn()) {
      navigate('/add-study');
    } else {
      console.log('로그인을 해주세요.');
      alert('로그인 후 가능합니다.');
    }
  };

  const openModal = (title) => {
    setSelectedTitle(title); // 클릭한 title을 상태에 저장
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="recruit">
      <ul className="box-list">
        <li className="box">
          <div
            className="title"
            onClick={() => openModal('경찰공무원 스터디방')}
          >
            <b>경찰공무원 스터디방</b>
          </div>
          <div className="user-info">
            <div className="info">
              <div className="count">10 / 100</div>
            </div>
            <div className="detail"></div>
          </div>
        </li>

        <li className="box">
          <div className="title" onClick={() => openModal('적성고사 스터디방')}>
            <b>적성고사 스터디방</b>
          </div>
          <div className="user-info">
            <div className="info">
              <div className="count">30 / 100</div>
            </div>
            <div className="detail"></div>
          </div>
        </li>

        <li className="box">
          <div className="title" onClick={() => openModal('임용고사 스터디방')}>
            <b>임용고사 스터디방</b>
          </div>
          <div className="user-info">
            <div className="info">
              <div className="count">25 / 100</div>
            </div>
            <div className="detail"></div>
          </div>
        </li>

        <li className="box">
          <div className="title" onClick={() => openModal('해외주식 공부방')}>
            <b>해외주식 공부방</b>
          </div>
          <div className="user-info">
            <div className="info">
              <div className="count">8 / 100</div>
            </div>
            <div className="detail"></div>
          </div>
        </li>

        <li className="box">
          <div
            className="title"
            onClick={() => openModal('7급 공무원을 위하여')}
          >
            <b>7급 공무원을 위하여</b>
          </div>
          <div className="user-info">
            <div className="info">
              <div className="count">6 / 100</div>
            </div>
            <div className="detail"></div>
          </div>
        </li>

        <li className="box">
          <div className="title" onClick={() => openModal('중국어 스터디')}>
            <b>중국어 스터디</b>
          </div>
          <div className="user-info">
            <div className="info">
              <div className="count">50 / 100</div>
            </div>
            <div className="detail"></div>
          </div>
        </li>

        <li className="box">
          <div
            className="title"
            onClick={() => openModal('타로사주 정보공유방')}
          >
            <b>타로사주 정보공유방</b>
          </div>
          <div className="user-info">
            <div className="info">
              <div className="count">10 / 100</div>
            </div>
            <div className="detail"></div>
          </div>
        </li>

        <li className="box">
          <div
            className="title"
            onClick={() => openModal('간호조무사 스터디방')}
          >
            <b>간호조무사 스터디방</b>
          </div>
          <div className="user-info">
            <div className="info">
              <div className="count">10 / 100</div>
            </div>
            <div className="detail"></div>
          </div>
        </li>

        <li className="box">
          <div className="title" onClick={openModal}>
            <b>경찰공무원 스터디원 모집</b>
          </div>
          <div className="user-info">
            <div className="info">
              <div className="count">10 / 100</div>
            </div>
            <div className="detail"></div>
          </div>
        </li>

        <li className="box">
          <div className="title" onClick={openModal}>
            <b>경찰공무원 스터디원 모집</b>
          </div>
          <div className="user-info">
            <div className="info">
              <div className="count">10 / 100</div>
            </div>
            <div className="detail"></div>
          </div>
        </li>

        <div className="new-study-link">
          <li className="new-study-box">
            <div className="new-study-content">
              <div className="plus-sign">+</div>
              <div className="new-study-text" onClick={handleAddStudyClick}>
                (새로운 스터디 생성하기)
              </div>
            </div>
          </li>
        </div>
      </ul>
      <CustomModal2
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedTitle={selectedTitle}
      />
    </div>
  );
}

export default Mid_Top;

import './Top.css';
import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import { MdSearch } from 'react-icons/md';
import CustomModal from '../Modal/Modal';
import Search from '../screen/Search';
import Range from '../screen/Range';
import Mid_Top from '../screen/Mid_Top';
import { Link, useNavigate } from 'react-router-dom';

function Top() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return false;
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddStudyClick = () => {
    if (isLoggedIn()) {
      navigate('/add-study');
    } else {
      console.log('로그인을 해주세요.');
    }
  };

  return (
    <div className="topContainer">
      <div className="wrap">
        <div className="logo">
          <Link to="/#" className="logoLink">
            <img
              className="logoBox"
              width="100px"
              height="85px"
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className="menu" style={{ fontFamily: 'Imprima, sans-serif' }}>
          <Link to="/Sidebar" className="navigation">
            Work
          </Link>
          <Link to="/Recruitment" className="navigation">
            Recruitment
          </Link>
          <Link to="/Notice" className="navigation">
            Notice
          </Link>
          <Link to="/About" className="navigation">
            About
          </Link>
        </div>
        <div className="login">
          <button onClick={openModal}>로그인</button>
        </div>
      </div>

      <div className="divider"></div>

      <div
        className="inputWrap"
        style={{
          position: 'absolute',
          top: '19%',
          left: '77%',
          transform: 'translate(5%, -50%)',
        }}
      >
        <input
          type="text"
          className="input"
          placeholder="  검색어를 입력하세요."
        />
        <MdSearch className="material-symbols-outlined" />
      </div>

      <Search />
      <Range />
      <Mid_Top />

      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} />

      <div className="plusButton">
        <button className="studyplus" onClick={handleAddStudyClick}>
          스터디 추가
        </button>
      </div>
    </div>
  );
}

export default Top;

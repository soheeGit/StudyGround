import './Top1.css';
import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import { MdSearch } from 'react-icons/md';
import CustomModal from '../Modal/Modal';
import { Link } from 'react-router-dom';

function Top() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
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
          <Link to="/Sidebar" className="navigation"></Link>
          <Link to="/Recruitment" className="navigation"></Link>
          <Link to="/Notice" className="navigation"></Link>
          <Link to="/About" className="navigation"></Link>
        </div>
        <div className="login">
          <button onClick={openModal}>로그인</button>
        </div>
      </div>

      <div className="divider"></div>

      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
}

export default Top;

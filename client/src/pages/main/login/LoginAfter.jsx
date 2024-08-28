import React from 'react';
import '../screen/Top.css';
import Search from '../screen/Search';
import Mid from '../screen/Mid';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import WorkHeader from '../../work/WorkHeader';

const LoginAfter = () => {
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
        <div className="addWorkHeader">
          <WorkHeader />
        </div>
      </div>

      <Search />
      <Mid />
    </div>
  );
};

export default LoginAfter;

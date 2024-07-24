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
          <Link to="/work" className="navigation">
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
        <WorkHeader />
      </div>
      <div className="divider"></div>
      <Search />
      <Mid />
    </div>
  );
};

export default LoginAfter;

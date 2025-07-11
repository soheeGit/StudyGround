import React, { useState } from 'react';
import '../screen/Top.css';
import Mid from '../screen/Mid';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import WorkHeader from '../../work/WorkHeader';

const LoginAfter = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
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
        <div className="addWorkHeader" style={{ marginRight: '40px' }}>
          <WorkHeader />
        </div>
      </div>

      <Mid
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default LoginAfter;

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Work.css';
import Sidebar from './sidebar/Sidebar'
import WorkHeader from './WorkHeader';
import DashBoard from './Content/Dashboard/DashBoard';

const Work = (props) => {
  return (
    <div className="work-container">
      <Sidebar />
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Work;

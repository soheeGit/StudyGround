import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import './Work.css';
import Sidebar from './sidebar/Sidebar';
import WorkHeader from './WorkHeader';
import DashBoard from './Content/Dashboard/DashBoard';

const Work = (props) => {
  const { boardId } = useParams();
  console.log(boardId);
  return (
    <div className="work-container">
      <Sidebar boardId={boardId} />
      <div className="content-container">
        <Outlet context={{ boardId }} />
      </div>
    </div>
  );
};

export default Work;

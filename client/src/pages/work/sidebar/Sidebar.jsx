import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Sidebar.css';
import SidebarItem from './SidebarItem';
import GroupSelector from './GroupSelector';
import logo1 from '../../../assets/logo1.png';
import { AiFillHome } from 'react-icons/ai'; /* dashboard icon */
import { FaVideo } from 'react-icons/fa';
import { IoChatboxEllipses } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaClipboard } from 'react-icons/fa';
import { TiCloudStorage } from 'react-icons/ti';
import DashBoard from '../Content/Dashboard/DashBoard';

const Sidebar = ({ boardId, onComponentChange }) => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const itemSelect = (itemtitle) => {
    setSelectedItem(itemtitle);
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar-top">
        <div className="logo-container">
          <Link to="/">
            <img src={logo1} />
          </Link>
        </div>
        <GroupSelector />
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-items-container">
          <Link to={`/work/${boardId}/dashboard`}>
            <SidebarItem
              title="Dashboard"
              icon={<AiFillHome />}
              onClick={() => itemSelect('Dashboard')}
              isSelected={selectedItem === 'Dashboard'}
            />
          </Link>
          <Link to={`/work/${boardId}/video`}>
            <SidebarItem
              title="Video"
              icon={<FaVideo />}
              onClick={() => itemSelect('Video')}
              isSelected={selectedItem === 'Video'}
            />
          </Link>
          <Link to={`/work/${boardId}/calendar`}>
            <SidebarItem
              title="Calendar"
              icon={<FaCalendarAlt />}
              onClick={() => itemSelect('Calendar')}
              isSelected={selectedItem === 'Calendar'}
            />
          </Link>
          <Link to={`/work/${boardId}/board`}>
            <SidebarItem
              title="Board"
              icon={<FaClipboard />}
              onClick={() => itemSelect('Board')}
              isSelected={selectedItem === 'Board'}
            />
          </Link>
          <Link to={`/work/${boardId}/storage`}>
            <SidebarItem
              title="Storage"
              icon={<TiCloudStorage />}
              onClick={() => itemSelect('Storage')}
              isSelected={selectedItem === 'Storage'}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

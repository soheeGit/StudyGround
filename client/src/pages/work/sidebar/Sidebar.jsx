import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import SidebarItem from './SidebarItem';
import GroupSelector from './GroupSelector';
import logo1 from '../../../assets/logo1.png'
import { AiFillHome } from 'react-icons/ai'; /* dashboard icon */
import { FaVideo } from 'react-icons/fa';
import { IoChatboxEllipses } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaClipboard } from 'react-icons/fa';
import { TiCloudStorage } from 'react-icons/ti';
import DashBoard from '../Content/Dashboard/DashBoard';

const Sidebar = (onComponentChange) => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const itemSelect = (itemtitle) => {
    setSelectedItem(itemtitle);
    console.log(selectedItem);
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar-top">
        <div className="logo-container">
          <Link>
            {/*  메인페이지 링크 추후 넣기 */}
            <img src={logo1} />
          </Link>
        </div>
        <GroupSelector />
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-items-container">
          <Link to="/work/dashboard">
            <SidebarItem
              title="Dashboard"
              icon={<AiFillHome />}
              onClick={() => itemSelect('Dashboard')}
              isSelected={selectedItem === 'Dashboard'}
            />
          </Link>
          <Link to="/work/video">
            <SidebarItem
              title="Video"
              icon={<FaVideo />}
              onClick={() => itemSelect('Video')}
              isSelected={selectedItem === 'Video'}
            />
          </Link>
          <Link to="/work/chat">
            <SidebarItem
              title="Chat"
              icon={<IoChatboxEllipses />}
              onClick={() => itemSelect('Chat')}
              isSelected={selectedItem === 'Chat'}
            />
          </Link>
          <Link to="/work/calendar">
            <SidebarItem
              title="Calendar"
              icon={<FaCalendarAlt />}
              onClick={() => itemSelect('Calendar')}
              isSelected={selectedItem === 'Calendar'}
            />
          </Link>
          <Link to="/work/board">
            <SidebarItem
              title="Board"
              icon={<FaClipboard />}
              onClick={() => itemSelect('Board')}
              isSelected={selectedItem === 'Board'}
            />
          </Link>
          <Link to="/work/storage">
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

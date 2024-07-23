import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import WorkHeadr from '../../WorkHeader';
import './Storage.css';
import storage1 from '../../../../assets/storage1.png';
import storage2 from '../../../../assets/storage2.png';
import storage3 from '../../../../assets/storage3.png';
import storage4 from '../../../../assets/storage4.png';
import { FaPlus } from 'react-icons/fa6';

const Storage = () => {
  const { boardId } = useOutletContext();
  // const [selectedTab, setSelectedTab] = useState('');
  // console.log(selectedTab);
  // const tabHandler = (title) => {
  //   setSelectedTab(title);
  //   console.log(selectedTab);
  // };

  return (
    <>
      <WorkHeadr title="Storage" />
      <div className="storage-container">
        {/* Notice Tab*/}
        <div className="storage-notice-container">
          <div className="tab-header">
            <div className="tab-header-img">
              <img src={storage1} width={'50px'} />
            </div>
            <p>Notice</p>
            <Link to={`/work/${boardId}/notice`} style={{ display: 'flex' }}>
              <div className="tab-header-button">
                <FaPlus />
              </div>
            </Link>
          </div>
        </div>
        {/* File Tab*/}
        <div className="storage-file-container">
          <div className="tab-header">
            <div className="tab-header-img">
              <img src={storage2} width={'50px'} />
            </div>
            <p>File</p>
            <Link to="memo" style={{ display: 'flex' }}>
              <div className="tab-header-button">
                <FaPlus />
              </div>
            </Link>
          </div>
        </div>
        {/* Memo Tab*/}
        <div className="storage-memo-container">
          <div className="tab-header">
            <div className="tab-header-img">
              <img src={storage3} width={'50px'} />
            </div>
            <p>Memo</p>
            <Link to={`/work/${boardId}/memo`} style={{ display: 'flex' }}>
              <div className="tab-header-button">
                <FaPlus />
              </div>
            </Link>
          </div>
          <div className="memo-content-box"></div>
        </div>
        <div className="storage-task-container">
          <div className="tab-header">
            <div className="tab-header-img">
              <img src={storage4} width={'50px'} />
            </div>
            <p>Task</p>
            <Link to={`/work/${boardId}/task`} style={{ display: 'flex' }}>
              <div className="tab-header-button">
                <FaPlus />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Storage;

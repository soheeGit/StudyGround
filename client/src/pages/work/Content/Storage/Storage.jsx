import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import WorkHeadr from '../../WorkHeader';
import './Storage.css';
import storage1 from '../../../../assets/storage1.png';
import storage2 from '../../../../assets/storage2.png';
import storage3 from '../../../../assets/storage3.png';
import storage4 from '../../../../assets/storage4.png';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';

const Storage = () => {
  const { boardId } = useOutletContext();

  // 상위 5개 데이터 출력
  const [memo5, setMemo5] = useState([]);
  useEffect(() => {
    const fetchMemo5 = async () => {
      try {
        const Response = await axios.get(`/storage/currentMemo`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setMemo5(Response.data);
        console.log(Response.data);
      } catch (error) {
        console.error('메모 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemo5();
    console.log(memo5);
  }, []);
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
          <div className="memo-content-box">
            {memo5.map((memo, memoId) => (
              <>{memo.title}</>
            ))}
          </div>
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

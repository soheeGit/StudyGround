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
import { useQuery } from '@tanstack/react-query';
import { fetchMemo5, fetchNotice5, fetchTask5 } from '../../api/fetch5data';
import { FormatMonthDay } from '../../Component/FormattedDate';

const Storage = () => {
  const { boardId } = useOutletContext();

  // 상위 5개 공지사항 데이터 fetch
  const { data: notice5, isNotice5Loading } = useQuery({
    queryKey: ['notice5', boardId],
    queryFn: () => fetchNotice5(boardId),
  });

  // 상위 5개 과제 데이터 fetch
  const { data: task5, isTask5Lodaing } = useQuery({
    queryKey: ['task5', boardId],
    queryFn: () => fetchTask5(boardId),
  });

  // 상위 5개 메모 데이터 fetch
  const { data: memo5, isMemo5Loading } = useQuery({
    queryKey: 'memo5',
    queryFn: fetchMemo5,
  });

  const [selectedTab, setSelectedTab] = useState('');
  console.log(selectedTab);
  const tabHandler = (title) => {
    setSelectedTab(title);
    console.log(selectedTab);
  };

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
          <div className="storage-notice-content-container">
            {notice5 && notice5.length > 0 ? (
              notice5.map((notice5, notice5Key) => (
                <div className="storage-notice-content-row">
                  <div className="storage-notice-content-number">
                    {notice5.id}
                  </div>
                  <div className="storage-notice-content-title">
                    {notice5.title}
                  </div>
                  <div className="storage-notice-content-date">
                    <FormatMonthDay dateString={notice5.updatedAt} />
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* File Tab*/}
        <div className="storage-file-container">
          <div className="tab-header">
            <div className="tab-header-img">
              <img src={storage2} width={'50px'} />
            </div>
            <p>File</p>
            <Link to={`/work/${boardId}/file`} style={{ display: 'flex' }}>
              <div className="tab-header-button">
                <FaPlus />
              </div>
            </Link>
          </div>
          <div></div>
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
            {memo5 && memo5.length > 0 ? (
              memo5.map((memo, memoId) => (
                <div className="memo-content-row">{memo.title}</div>
              ))
            ) : (
              <></>
            )}
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
          <div className="storage-task-content-container">
            {task5 && task5.length > 0 ? (
              task5.map((task, taskId) => (
                <div className="storage-task-content-row">
                  <div className="storage-task-content-number">{taskId}</div>
                  <div className="storage-task-content-title">{task.title}</div>
                  <div className="storage-task-content-date">
                    <FormatMonthDay dateString={task.updatedAt} />
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Storage;

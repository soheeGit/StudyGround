import React, { useEffect, useRef, useState } from 'react';
import './NoticePage.css';
import WorkHeader from '../../../WorkHeader';
import axios from 'axios';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import clip from '../../../../../assets/clip.png';
import star from '../../../../../assets/star.png';
import nostar from '../../../../../assets/nostar.png';
import { Button } from '../../../Component/Button';

const NoticePage = () => {
  const { boardId } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOutletVisible, setIsOutletVisible] = useState(false); // Outlet 활성화 상태

  // Notice 데이터
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const fetchNoticesRef = useRef(null);

  // 현재 URL이 /notice/addnotice인 경우 Outlet 활성화
  useEffect(() => {
    if (
      location.pathname.includes('/notice/addnotice') ||
      /\/notice\/\d+/.test(location.pathname)
    ) {
      setIsOutletVisible(true);
    } else {
      setIsOutletVisible(false);
    }
  }, [location]);

  // fetch Notice data
  const fetchNotices = async () => {
    try {
      const noticeResponse = await axios.get(`/storage/notice/${boardId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNotices(noticeResponse.data);
      console.log(noticeResponse.data);
    } catch (error) {
      console.error('공지사항 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchNotices();
    fetchNoticesRef.current = fetchNotices;
  }, [boardId]);

  // 공지사항 상세확인 : NopticeDetail로 notice데이터 넘겨준다
  const handleClickNotice = (notice) => {
    navigate(`/work/${boardId}/notice/${notice.id}`, { state: { notice } });
  };

  return (
    <>
      <WorkHeader title="Storage" />
      <div className="task-header-container">Notice</div>
      <hr id="divider" />
      {!isOutletVisible && (
        <>
          <div className="notice-content-container">
            <div className="notice-content-header">
              <div className="notice-content-header-1">중요</div>
              <div className="notice-content-header-2"></div>
              <div className="notice-content-header-3">첨부파일</div>
              <div className="notice-content-header-4">날짜</div>
            </div>
            <div className="notice-content-list">
              {notices && notices.length > 0 ? (
                notices.map((notice, noticeKey) => (
                  <div className="table-list-container">
                    <div className="notice-content-header-1">
                      {notice.importance == 'High' ? (
                        <img src={star} style={{ width: '30px' }} />
                      ) : (
                        <img src={nostar} style={{ width: '30px' }} />
                      )}
                    </div>
                    <div id="notice-content-header-2">
                      <div
                        className="notice-content-title"
                        onClick={() => handleClickNotice(notice)}
                      >
                        {notice.title}
                      </div>
                    </div>
                    <div className="lnotice-content-header-3">
                      {notice.files.length > 0 ? (
                        <>
                          <img src={clip} style={{ width: '30px' }} />
                        </>
                      ) : (
                        <>-</>
                      )}
                    </div>
                    <div className="notice-content-header-4">2024-03-30</div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="buttonsArea">
              <Button
                name="등록"
                color="#E86161"
                onClick={() => navigate('addnotice')}
              />
            </div>
          </div>
        </>
      )}

      <Outlet context={{ boardId, fetchNoticesRef }} />

      {/* {!selectedTask ? (
        <TaskList tasks={task} onSelectTask={handleSelectTask} />
      ) : (
        <TaskDetail task={selectedTask} onBack={handleBackToList} />
      )} */}
    </>
  );
};
export default NoticePage;

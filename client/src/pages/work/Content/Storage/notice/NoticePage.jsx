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

  // 현재 URL이 /addnotice인 경우 Outlet 활성화
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

  // 공지사항 데이터 get
  const fetchNotices = async () => {
    try {
      const noticeResponse = await axios.get(`/storage/notice/${boardId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const sortedNotices = noticeResponse.data.sort((a, b) =>
        b.importance === 'High' ? 1 : -1
      );
      setNotices(sortedNotices);
    } catch (error) {
      console.error('공지사항 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchNotices();
    fetchNoticesRef.current = fetchNotices;
  }, [boardId]);

  // 공지사항 상세확인 : NoticeDetail로 notice데이터 넘겨준다
  const handleClickNotice = (notice) => {
    navigate(`/work/${boardId}/notice/${notice.id}`, { state: { notice } });
  };

  /* 페이지네이션 */
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const datasPerPage = 7;

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 현재 페이지의 공지사항 가져오기
  const indexOfLastData = currentPage * datasPerPage;
  const indexOfFirstData = indexOfLastData - datasPerPage;
  const currentDatas = notices.slice(indexOfFirstData, indexOfLastData);

  // 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(notices.length / datasPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {/* header */}
      <WorkHeader title="Storage" />
      <div className="task-header-container">Notice</div>
      <hr id="divider" />

      {/* body */}
      {!isOutletVisible && (
        <>
          <div className="my-container">
            <div className="notice-content-header">
              <div className="notice-header-1">중요</div>
              <div className="notice-header-2"></div>
              <div className="notice-header-3">첨부파일</div>
              <div className="notice-header-4">날짜</div>
            </div>
            <div className="notice-content-container">
              {currentDatas && currentDatas.length > 0 ? (
                currentDatas.map((notice, noticeKey) => (
                  <div className="notice-content-box">
                    <div className="notice-content-1">
                      {notice.importance == 'High' ? (
                        <img src={star} style={{ width: '30px' }} />
                      ) : (
                        <img src={nostar} style={{ width: '30px' }} />
                      )}
                    </div>
                    <div className="notice-content-2">
                      <div
                        className="notice-content-title"
                        onClick={() => handleClickNotice(notice)}
                      >
                        {notice.title}
                      </div>
                    </div>
                    <div className="notice-content-3">
                      {notice.files.length > 0 ? (
                        <>
                          <img src={clip} style={{ width: '30px' }} />
                        </>
                      ) : (
                        <>-</>
                      )}
                    </div>
                    <div className="notice-content-4">2024-03-30</div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="table-footer">
              <div className="pagination">
                {pageNumbers.map((number) => (
                  <Button
                    key={number}
                    name={number}
                    onClick={() => handlePageChange(number)}
                    color="#D9D9D9"
                    hoverColor="#E0E0E0"
                  />
                ))}
              </div>
              <div className="buttonsArea">
                <Button
                  name="등록"
                  color="#E86161"
                  onClick={() => navigate('addnotice')}
                  hoverColor="#D2625D"
                />
              </div>
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

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
import { fetchNotices } from '../../../api/noticeApi';
import { useQuery } from '@tanstack/react-query';
import { FormatFullDate } from '../../../Component/FormattedDate';

const NoticePage = () => {
  const client = JSON.parse(localStorage.getItem('user'));
  const userId = client.user.id;
  const { boardId, leaderId } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOutletVisible, setIsOutletVisible] = useState(false); // Outlet 활성화 상태
  // const userId = client.user.id;
  const [selectedNotice, setSelectedNotice] = useState(null);

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
  const {
    data: notices,
    isLoading: isNoticesLoading,
    isError,
  } = useQuery({
    queryKey: ['notices', boardId],
    queryFn: () => fetchNotices(boardId),
  });
  console.log(notices);

  // 공지사항 상세확인 : NoticeDetail로 notice데이터 넘겨준다
  const handleClickNotice = (notice) => {
    navigate(`/work/${boardId}/notice/${notice.id}`, { state: { notice } });
  };

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
  const currentDatas =
    notices && notices.length > 0
      ? notices.slice(indexOfFirstData, indexOfLastData)
      : [];

  // 페이지 번호 계산
  const pageNumbers =
    notices && notices.length > 0
      ? Array.from(
          { length: Math.ceil(notices.length / datasPerPage) },
          (_, i) => i + 1
        )
      : [];

  // if (isNoticesLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error loading notices. Please try again later.</div>;
  // }

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
              {currentDatas.length > 0 ? (
                currentDatas.map((notice, noticeKey) => (
                  <div key={noticeKey} className="notice-content-box">
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
                    <div className="notice-content-4">
                      <FormatFullDate dateString={notice.updatedAt} />
                    </div>
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
              {userId === leaderId ? (
                <div className="buttonsArea">
                  <Button
                    name="등록"
                    color="#E86161"
                    onClick={() => navigate('addnotice')}
                    hoverColor="#D2625D"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
      <Outlet context={{ boardId, userId, leaderId }} />
    </>
  );
};
export default NoticePage;

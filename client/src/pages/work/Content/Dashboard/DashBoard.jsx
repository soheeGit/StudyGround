import React, { useEffect, useState } from 'react';
import './DashBoard.css';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import WorkHeader from '../../WorkHeader';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import storage1 from '../../../../assets/storage1.png';
import storage3 from '../../../../assets/storage3.png';
import { FormatFullDate2 } from '../../Component/FormattedDate';
import { fetchMemo5, fetchNotice5 } from '../../api/fetch5data';
import { useQuery } from '@tanstack/react-query';
import { fetchBoardDetails } from '../../api/boardDetailApi';
import Evaluation from '../../../main/evaluation/Evaluation';
import Chat from '../Chat/Chat';

const DashBoard = () => {
  const { boardId } = useOutletContext();
  const { myStudy } = useOutletContext();
  const [dday, setDday] = useState('');

  // 스터디 종료 후 상호평가 모달 창
  const [showModal, setShowModal] = useState(false);

  // 특정 스터디 데이터 fetch
  const { data: board, isLoading: isBoardLoading } = useQuery({
    queryKey: ['boardDetails', boardId],
    queryFn: () => fetchBoardDetails(boardId),
  });

  // 상위 5개 공지사항 데이터 fetch
  const { data: notice5, isNotice5Loading } = useQuery({
    queryKey: ['notice5', boardId],
    queryFn: () => fetchNotice5(boardId),
  });
  console.log(notice5);

  // 상위 5개 메모 데이터 fetch
  const { data: memo5, isMemo5Loading } = useQuery({
    queryKey: 'memo5',
    queryFn: fetchMemo5,
  });

  // 현재 날짜랑 비교해서 스터디 기간이 끝난 스터디에만 모달창 뜨게 설정
  useEffect(() => {
    if (board) {
      const currentDate = new Date();
      const endDate = new Date(board.bClosingDate);
      const dday = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));
      setDday(dday);
      if (currentDate > endDate) {
        setShowModal(true);
      }
    }
  }, [board]);
  console.log(notice5);
  return (
    <>
      <WorkHeader title="DashBoard" />

      <div className="dashboard-container">
        <div className="dashboard-header-container">
          <div className="dday-container">
            <div className="dday1">D - {dday}</div>
            <div className="dday2">
              <a />
              {board && (
                <>
                  {<FormatFullDate2 dateString={board.bStartDate} />} ~{' '}
                  {<FormatFullDate2 dateString={board.bClosingDate} />}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="dashboard-content-container">
          <div className="dashboard-content-left">
            <div className="dashboard-content-left-1">
              <div className="dashboard-content-left-1-title">
                <img src={storage1} width={'50px'} />
                Notice
              </div>
              <div className="dashboard-content-left-1-content">
                {/* notice5 map */}
                {notice5 && notice5.length > 0 ? (
                  notice5.map((notice, index) => (
                    <>
                      <div className="dashboard-content-left-1-content-row">
                        <div className="dashboard-content-title">
                          [{notice.title}]
                        </div>
                        <div className="dashboard-content-date">
                          <FormatFullDate2 dateString={notice.updatedAt} />
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="dashboard-content-left-1">
              <div className="dashboard-content-left-1-title">
                <img src={storage3} width={'50px'} />
                Memo
              </div>
              <div className="dashboard-content-left-1-content">
                {/* memo5 map */}
                {memo5 && memo5.length > 0 ? (
                  memo5.map((memo, index) => (
                    <>
                      <div className="dashboard-content-left-1-content-row">
                        <div className="dashboard-content-memo-title">
                          {memo.title}
                        </div>
                        <div className="dashboard-content-memo-date">
                          <FormatFullDate2 dateString={memo.updatedAt} />
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="dashboard-content-right-wrap">
            <div className="dashboard-content-right-1">
              <Chat />
            </div>
          </div>
        </div>
      </div>
      {showModal && <Evaluation />}
    </>
  );
};

export default DashBoard;

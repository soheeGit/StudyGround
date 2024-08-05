import React, { useEffect, useState } from 'react';
import './DashBoard.css';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import WorkHeader from '../../WorkHeader';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import storage1 from '../../../../assets/storage1.png';
import storage3 from '../../../../assets/storage3.png';
import FormattedDate from '../../Component/FormattedDate';

const DashBoard = () => {
  const { boardId } = useOutletContext();
  const { myStudy } = useOutletContext();
  console.log(myStudy);

  // 상위 5개 공지사항 데이터 fetch
  const [notice5, setNotice5] = useState([]);
  useEffect(() => {
    const fetchNotice5 = async () => {
      try {
        const Response = await axios.get(`/storage/currentNotice/${boardId}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setNotice5(Response.data);
        console.log(Response.data);
      } catch (error) {
        console.error(
          '상위 5개 공지사항 데이터를 가져오는 중 오류 발생:',
          error
        );
      }
    };

    fetchNotice5();
  }, [boardId]);

  // 상위 5개 메모 데이터 fetch
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
        console.error('상위 5개 메모 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemo5();
    console.log(memo5);
  }, []);
  return (
    <>
      <WorkHeader title="DashBoard" />

      <div className="dashboard-container">
        <div className="dashboard-header-container">
          <div className="dday-container">
            <div className="dday1">
              <a /> D - 365
            </div>
            <div className="dday2">
              <a />
              2024.01.01 ~ 2024.08.31
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
                        [ {notice.title} ]
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
                        <FormattedDate dateString={memo.updatedAt} />-{' '}
                        {memo.title}
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
            <div className="dashboard-content-right-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;

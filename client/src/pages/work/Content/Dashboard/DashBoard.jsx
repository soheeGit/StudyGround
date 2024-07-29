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
  const { myBoard } = useOutletContext();

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
  }, []);

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
          <div className="dashboard-content-1">
            <div className="dashboard-content-1-title">About Studying</div>
            <div className="dashboard-content-1-content">
              안녕하세요! 저희는 Opic 스터디 그룹입니다. 우리 목표는 AL 레벨을
              달성하는 것입니다. <br />
              스터디 날짜는 팀원들과의 회의를 통해 유동적으로 정할 예정입니다.
              따라서 유연한 스케줄로 참여할 수 있습니다. <br />각 스터디
              세션마다 정해진 과제가 있으며, 이를 통해 체계적으로 준비하고
              실력을 향상시킬 수 있습니다. <br />
              다같이 함께 성장하고 목표를 달성합시다 화이팅!
            </div>
          </div>
          <div className="dashboard-content-2">
            <div className="dashboard-content-2-1">
              <div className="dashboard-content-2-1-title">
                <img src={storage1} width={'50px'} />
                Notice
              </div>
              <div className="dashboard-content-2-1-content">
                {/* notice5 map */}
                {notice5 && notice5.length > 0 ? (
                  notice5.map((notice, index) => (
                    <>
                      <div className="dashboard-content-2-1-content-row">
                        [ {notice.title} ]
                      </div>
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="dashboard-content-2-1">
              <div className="dashboard-content-2-1-title">
                <img src={storage3} width={'50px'} />
                Memo
              </div>
              <div className="dashboard-content-2-1-content">
                {/* memo5 map */}
                {memo5 && memo5.length > 0 ? (
                  memo5.map((memo, index) => (
                    <>
                      <div className="dashboard-content-2-1-content-row">
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
        </div>
      </div>
    </>
  );
};

export default DashBoard;

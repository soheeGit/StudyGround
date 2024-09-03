// 로그인 후 Mid
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mid.css';
import CustomModal2 from '../Modal/Modal2';
import { Link } from 'react-router-dom';
import Search_Mid from '../screen/Search_Mid';

function Mid({ selectedFilter, onFilterChange }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [myBoards, setMyBoards] = useState([]);
  const [otherBoards, setOtherBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);

  const openModal = (board) => {
    setSelectedBoard(board);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchMyBoards();
    fetchOtherBoards();
  }, []);

  useEffect(() => {
    filterBoards();
  }, [otherBoards, selectedFilter]);

  const fetchMyBoards = async () => {
    try {
      const response = await axios.get('/api/myBoard', {
        withCredentials: true,
      });
      const allBoards = response.data;
      console.log('Fetched boards:', allBoards); // API 응답을 콘솔에 출력하여 확인

      // 응답이 배열인지 확인한 후 상태 설정
      setMyBoards(Array.isArray(allBoards) ? allBoards : []);
    } catch (error) {
      console.error('Error fetching my boards:', error);
    }
  };

  const fetchOtherBoards = async () => {
    try {
      const response = await axios.get('/api/boards', {
        withCredentials: true,
      });
      const boardsData = response.data;
      setOtherBoards(boardsData);
    } catch (error) {
      console.error('Error fetching other boards:', error);
    }
  };

  const filterBoards = () => {
    if (selectedFilter === '전체') {
      setFilteredBoards(otherBoards);
    } else {
      setFilteredBoards(
        otherBoards.filter((board) => board.bType === selectedFilter)
      );
    }
  };

  return (
    <div className="mid_recruit">
      <div className="section-header">
        <p className="large-text">My</p>
        <p className="small-text">내 스터디</p>
      </div>
      <ul className="mid_box-list">
        {Array.isArray(myBoards) &&
          myBoards.map(
            (
              board // 배열 확인 후 map 실행
            ) => (
              <li key={board.bId} className="box">
                <div className="mid_title">
                  <Link to={`/work/${board.bId}/dashboard`}>
                    <b>{board.bName}</b>
                  </Link>
                </div>

                <div className="user-info">
                  <div className="mid_info">
                    <div className="mid_count">
                      {board.bCurrentNumber} / {board.bTotalNumber}
                    </div>
                  </div>
                  <div className="detail"></div>
                </div>
              </li>
            )
          )}
        <Link
          to="/add-study"
          className="new-study-link"
          style={{ textDecoration: 'none' }}
        >
          <li className="new-study-box">
            <div className="new-study-content">
              <div className="plus-sign">+</div>
              <div className="new-study-text">(새로운 스터디 생성하기)</div>
            </div>
          </li>
        </Link>
      </ul>

      <hr className="mid_divider" />

      <div className="other-studies-section">
        <div className="search-mid-container">
          <Search_Mid onFilterChange={onFilterChange} />
        </div>
        <div className="other-studies-list">
          <div className="section-header">
            <p className="large-text">Other</p>
            <p className="small-text">다른 스터디</p>
          </div>

          <ul className="mid_box-list">
            {filteredBoards.map((board) => (
              <li key={board.bId} className="box">
                <div className="title" onClick={() => openModal(board)}>
                  <b>{board.bName}</b>
                </div>
                <div className="user-info">
                  <div className="mid_info">
                    <div className="mid_count">
                      {board.bCurrentNumber} / {board.bTotalNumber}
                    </div>
                  </div>
                  <div className="detail"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CustomModal2
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedBoard={selectedBoard}
      />
    </div>
  );
}

export default Mid;

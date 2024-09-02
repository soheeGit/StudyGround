// 로그인 전 Mid
import './Mid_Top.css';
import CustomModal2 from '../Modal/Modal2';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Mid_Top({ selectedFilter }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return false;
  };

  const handleAddStudyClick = () => {
    if (isLoggedIn()) {
      navigate('/add-study');
    } else {
      console.log('로그인을 해주세요.');
      alert('로그인 후 가능합니다.');
    }
  };

  const openModal = (title) => {
    setSelectedTitle(title); // 클릭한 title을 상태에 저장
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    filterBoards();
  }, [boards, selectedFilter]);

  const fetchBoards = async () => {
    try {
      const response = await axios.get('/api/boards', {
        withCredentials: true,
      });
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterBoards = () => {
    if (selectedFilter === '전체') {
      setFilteredBoards(boards);
    } else {
      setFilteredBoards(
        boards.filter((board) => board.bType === selectedFilter)
      );
    }
  };

  return (
    <div className="recruit">
      <ul className="box-list">
        {filteredBoards.map((board) => (
          <li key={board.bId} className="box">
            <div className="title" onClick={() => openModal(board)}>
              <b>{board.bName}</b>
            </div>
            <div className="user-info">
              <div className="info">
                <div className="count">
                  {board.bCurrentNumber} / {board.bTotalNumber}
                </div>
              </div>
              <div className="detail"></div>
            </div>
          </li>
        ))}

        <div className="new-study-link">
          <li className="new-study-box">
            <div className="new-study-content">
              <div className="plus-sign">+</div>
              <div className="new-study-text" onClick={handleAddStudyClick}>
                (새로운 스터디 생성하기)
              </div>
            </div>
          </li>
        </div>
      </ul>
      <CustomModal2
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedTitle={selectedTitle}
      />
    </div>
  );
}

export default Mid_Top;

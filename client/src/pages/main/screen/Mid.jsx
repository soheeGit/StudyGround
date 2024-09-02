// 로그인 후 Mid
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mid.css';
import CustomModal2 from '../Modal/Modal2';
import { Link } from 'react-router-dom';

function Mid({ selectedFilter }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);

  const openModal = (board) => {
    setSelectedBoard(board);
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
    <div className="mid_recruit">
      <ul className="mid_box-list">
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

        <Link to="/add-study" className="new-study-link">
          <li className="new-study-box">
            <div className="new-study-content">
              <div className="plus-sign">+</div>
              <div className="new-study-text">(새로운 스터디 생성하기)</div>
            </div>
          </li>
        </Link>
      </ul>

      <CustomModal2
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedBoard={selectedBoard}
      />
    </div>
  );
}

export default Mid;

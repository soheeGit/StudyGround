import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mid.css';
import CustomModal2 from '../Modal/Modal2';

const Mid = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [boards, setBoards] = useState([]);

  const openModal = (title) => {
    setSelectedTitle(title);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

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

  if (boards.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recruit">
      <ul className="box-list">
        {boards.map((board) => (
          <li key={board.bId} className="box">
            <div className="title" onClick={() => openModal(board.bName)}>
              <b>{board.bName}</b>
            </div>
            <div className="user-info">
              <div className="info">
                <div className="count">
                  {board.currentCount} / {board.bTotalNumber}
                </div>
              </div>
              <div className="detail"></div>
            </div>
          </li>
        ))}
      </ul>
      <CustomModal2
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedTitle={selectedTitle}
      />
    </div>
  );
};

export default Mid;

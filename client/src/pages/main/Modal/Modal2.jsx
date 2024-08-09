// Detail 모달창
import React from 'react';
import Modal from 'react-modal';
import './Modal2.css';
import Detail from '../screen/Detail';

function CustomModal2({ isOpen, onRequestClose, selectedBoard }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="customModal2"
    >
      {selectedBoard && <Detail board={selectedBoard} />}
    </Modal>
  );
}

export default CustomModal2;

import React from 'react';
import Modal from 'react-modal';
import './Modal2.css';
import Detail from '../screen/Detail'; 

function CustomModal2({ isOpen, onRequestClose, selectedTitle }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="customModal2">
      <Detail selectedTitle={selectedTitle} /> {/* selectedTitle 전달 */}
    </Modal>
  );
}

export default CustomModal2;

import React from 'react';
import Modal from 'react-modal';
import './Modal.css'
import Login from '../login/Login'; 


function CustomModal({ isOpen, onRequestClose }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="customModal">
      <Login />
    </Modal>
  );
}

export default CustomModal;

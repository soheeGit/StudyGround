// Modal.js
import React from 'react';
import './AddSchedule.css';

const AddSchedule = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default AddSchedule;

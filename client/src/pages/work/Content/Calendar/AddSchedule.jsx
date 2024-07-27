// AddSchedule.jsx
import React, { useState } from 'react';
import './AddSchedule.css';
import { Button } from '../../Component/Button';
import MyModal from '../../Component/MyModal';
import ColorPicker from './ColorPicker';
import axios from 'axios';

const AddSchedule = ({ show, onClose, boardId }) => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    fullTime: false,
    color: '',
    url: '',
    memo: '',
  });
  const handleColorChange = (color) => {
    setFormData({ ...formData, color });
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const dataToSubmit = {
      ...formData,
      fullTime: formData.fullTime ? 'true' : 'false', // Ensure boolean is converted to string
    };
    try {
      const response = await axios.post(
        `/calendar/submitSchedule/${boardId}`,
        dataToSubmit
      );
      if (response.data.success) {
        alert('Schedule added successfully');
        onClose(false);
        setFormData({
          title: '',
          startDate: '',
          endDate: '',
          startTime: '',
          endTime: '',
          fullTime: 'false',
          color: '',
          url: '',
          memo: '',
        });
      }
    } catch (error) {
      console.error('Error adding schedule:', error);
      alert('Error adding schedule');
    }
  };

  return (
    <MyModal show={show} onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <div className="addschedule-container">
          <div className="addschedule-title">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="일정 제목"
              required
              style={{ backgroundColor: 'fomrData.color' }}
            />
          </div>
          <div className="addschedule-color">
            <div className="addschedule-color-title">Color</div>
            <ColorPicker
              selectedColor={formData.color}
              setSelectedColor={handleColorChange}
            />
          </div>
          <div className="addschedule-startD">
            <div className="addschedule-startD-date">
              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="addschedule-startD-time">
              <div>
                <label>Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="addschedule-startD">
            <div className="addschedule-startD-date">
              <label>End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="addschedule-startD-time">
              <div>
                <label>End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div>
            <label>Full Day:</label>
            <input
              type="checkbox"
              name="fullTime"
              checked={formData.fullTime}
              onChange={(e) =>
                setFormData({ ...formData, fullTime: e.target.checked })
              }
            />
          </div>
          <div className="addschedule-url">
            <label>URL:</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
            />
          </div>
          <div className="addschedule-memo">
            <label>Memo:</label>
            <textarea
              name="memo"
              value={formData.memo}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <Button type="submit" name="Submit" />
        </div>
      </form>
    </MyModal>
  );
};

export default AddSchedule;

// AddSchedule.jsx
import React, { useEffect, useState } from 'react';
import './AddSchedule.css';
import { Button } from '../../Component/Button';
import MyModal from '../../Component/MyModal';
import ColorPicker from './ColorPicker';
import axios from 'axios';

const AddSchedule = ({ show, onClose, boardId, fetchSchedules }) => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '00:00',
    endTime: '00:00',
    fullTime: false,
    color: '',
    url: '',
    memo: '',
  });

  // 모달창 close시 formData 초기화
  useEffect(() => {
    if (!show) {
      setFormData({
        title: '',
        startDate: '',
        endDate: '',
        startTime: '00:00',
        endTime: '00:00',
        fullTime: false,
        color: '',
        url: '',
        memo: '',
      });
    }
  }, [show]);

  const handleColorChange = (color) => {
    setFormData({ ...formData, color });
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  useEffect(() => {
    if (!formData.fullTime) {
      setFormData((prevState) => ({
        ...prevState,
        startTime: '00:00',
        endTime: '00:00',
      }));
    }
  }, [formData.fullTime]);

  // 유효성 검사
  const validateFormData = () => {
    const { startDate, endDate, startTime, endTime, color } = formData;
    if (!color) {
      return '색상을 선택하세요.';
    }
    if (new Date(startDate) > new Date(endDate)) {
      return '시작 날짜는 종료 날짜보다 빠르거나 같아야 합니다.';
    }
    if (startDate === endDate && startTime > endTime) {
      return '시작 시간은 종료 시간보다 빠르거나 같아야 합니다.';
    }
    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사 실행
    const validationError = validateFormData();
    if (validationError) {
      alert(validationError);
      return;
    }

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
        fetchSchedules();
        onClose(false);
        setFormData({
          title: '',
          startDate: '',
          endDate: '',
          startTime: '00:00',
          endTime: '00:00',
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
              <label>시작 날짜 </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            {formData.fullTime && (
              <div className="addschedule-startD-time">
                <div>
                  <label>시작 시간 </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="addschedule-startD">
            <div className="addschedule-startD-date">
              <label>종료 날짜 </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            {formData.fullTime && (
              <div className="addschedule-startD-time">
                <div>
                  <label>종료 시간 </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <label>시간 설정 </label>
            <input
              type="checkbox"
              name="fullTime"
              checked={formData.fullTime}
              onChange={(e) =>
                setFormData({ ...formData, fullTime: e.target.checked })
              }
            />
          </div>
          {/* <div className="addschedule-url">
            <label>URL:</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="addschedule-memo">
            <label>메모 </label>
            <textarea
              name="memo"
              value={formData.memo}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="addSchedule-submit-button">
            <Button type="submit" name="Submit" />
          </div>
        </div>
      </form>
    </MyModal>
  );
};

export default AddSchedule;

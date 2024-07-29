import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../../Component/Button';
import './ScheduleDetail.css';
import ColorPicker from './ColorPicker';
import { format } from 'date-fns'; // date format library

const ScheduleDetail = ({
  schedulesForDay,
  selectedDay,
  monthNames,
  fetchSchedules,
  boardId,
}) => {
  // 스케줄 수정
  const [editMode, setEditMode] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    color: '',
    memo: '',
  });
  const handleColorChange = (color) => {
    setEditFormData({ ...editFormData, color });
  };

  const handleEditSchedule = (schedulesForDay) => {
    setEditMode(schedulesForDay.id);
    setEditFormData({
      title: schedulesForDay.title,
      startDate: schedulesForDay.startDate,
      startTime: schedulesForDay.startTime,
      endDate: schedulesForDay.endDate,
      endTime: schedulesForDay.endTime,
      color: schedulesForDay.color,
      memo: schedulesForDay.memo,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };
  // 스케줄 수정 저장
  const handleSaveEdit = async (scheduleId) => {
    if (!validateForm()) return;
    try {
      const response = await axios.post(
        `/calendar/updateSchedule/${scheduleId}`,
        editFormData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        alert('스케줄이 성공적으로 수정되었습니다.');
        fetchSchedules();
        setEditMode(null);
      } else {
        alert('스케줄 수정 실패했습니다.');
      }
    } catch (error) {
      console.error('스케줄 수정 중 오류 발생:', error);
      alert('스케줄 수정 중 오류가 발생했습니다.');
    }
  };

  // 스케줄 수정 취소
  const handleCancelEdit = () => {
    setEditMode(null);
    setEditFormData({
      title: '',
      startTime: '',
      endTime: '',
      color: '',
      memo: '',
    });
  };
  // 스케줄 수정 유효성 검사
  const validateForm = () => {
    const { startDate, endDate, startTime, endTime } = editFormData;
    if (!startDate || !endDate) {
      alert('시작 날짜와 종료 날짜를 모두 입력해야 합니다.');
      return false;
    }
    if (startDate > endDate) {
      alert('시작 날짜가 종료 날짜보다 늦을 수 없습니다.');
      return false;
    }
    if (startDate === endDate && startTime > endTime) {
      alert('시작 시간이 종료 시간보다 늦을 수 없습니다.');
      return false;
    }
    if (!editFormData.color) {
      alert('색상을 선택하세요.');
      return false;
    }
    return true;
  };
  // 스케줄 삭제
  const handleDeleteSchedule = async (scheduleId) => {
    try {
      const response = await axios.get(
        `/calendar/deleteSchedule/${scheduleId}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data.success) {
        alert('스케줄이 성공적으로 삭제되었습니다.');
        fetchSchedules();
        // navigate(`../`);
      } else {
        alert('스케줄 삭제 실패했습니다.');
      }
    } catch (error) {
      console.error('스케줄 삭제 중 오류 발생:', error);
      alert('스케줄 삭제 중 오류가 발생했습니다.');
    }
  };

  // formating date
  const formatDateTime = (date, time) => {
    const dateTime = new Date(`${date}T${time}`);
    return format(dateTime, 'MM월 dd일 HH:mm');
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <div className="calendar-detail-wrap">
        {/* detail header */}
        <div className="calendar-detail-header">
          <div className="calendar-detail-header-1">
            {selectedDay ? <>DAY {selectedDay.getDate()}</> : <></>}
          </div>
          <div className="calendar-detail-header-2">
            {selectedDay ? <>of {monthNames[selectedDay.getMonth()]}</> : <></>}
          </div>
        </div>
        {/* detail header */}
        {/* detail body */}
        <div className="calendar-detail-content-wrapper">
          {schedulesForDay && schedulesForDay.length > 0 ? (
            schedulesForDay.map((schedulesForDay, index) => (
              <div className="calendar-detail-content" key={index}>
                {editMode === schedulesForDay.id ? (
                  <>
                    <div className="calendar-detail-content-title">
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleInputChange}
                      />
                      <div className="button-area">
                        <Button
                          name="저장"
                          color="#D9D9D9"
                          hoverColor="#E0E0E0"
                          onClick={() => handleSaveEdit(schedulesForDay.id)}
                        />
                        <Button
                          name="취소"
                          color="#D9D9D9"
                          hoverColor="#E0E0E0"
                          onClick={handleCancelEdit}
                        />
                      </div>
                    </div>
                    <div className="calendar-detail-content-date">
                      <input
                        type="date"
                        name="startDate"
                        value={editFormData.startDate}
                        onChange={handleInputChange}
                      />
                      ~
                      <input
                        type="date"
                        name="endDate"
                        value={editFormData.endDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="calendar-detail-content-time">
                      <input
                        type="time"
                        name="startTime"
                        value={editFormData.startTime}
                        onChange={handleInputChange}
                      />
                      ~
                      <input
                        type="time"
                        name="endTime"
                        value={editFormData.endTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="colorPicker-container">
                      <ColorPicker
                        selectedColor={editFormData.color}
                        setSelectedColor={handleColorChange}
                      />
                    </div>

                    <div
                      className="calendar-detail-content-content"
                      style={{ backgroundColor: `${schedulesForDay.color}` }}
                    >
                      <textarea
                        name="memo"
                        value={editFormData.memo}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="calendar-detail-content-title">
                      {schedulesForDay.title}
                      <div className="button-area">
                        <Button
                          name="수정"
                          color="#D9D9D9"
                          hoverColor="#E0E0E0"
                          onClick={() => handleEditSchedule(schedulesForDay)}
                        />
                        <Button
                          name="삭제"
                          color="#D9D9D9"
                          hoverColor="#E0E0E0"
                          onClick={() =>
                            handleDeleteSchedule(schedulesForDay.id)
                          }
                        />
                      </div>
                    </div>
                    <div className="calendar-detail-content-time">
                      {schedulesForDay.startDate != schedulesForDay.endDate ? (
                        <>
                          {formatDateTime(
                            schedulesForDay.startDate,
                            schedulesForDay.startTime
                          )}
                          ~
                          {formatDateTime(
                            schedulesForDay.endDate,
                            schedulesForDay.endTime
                          )}
                        </>
                      ) : (
                        <>
                          {' '}
                          {formatTime(schedulesForDay.startTime)}~
                          {formatTime(schedulesForDay.endTime)}
                        </>
                      )}
                    </div>
                    <div
                      className="calendar-detail-content-content"
                      style={{ backgroundColor: `${schedulesForDay.color}` }}
                    >
                      {schedulesForDay.memo ? (
                        <>{schedulesForDay.memo}</>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default ScheduleDetail;

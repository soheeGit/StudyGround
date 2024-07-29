import axios from 'axios';
import { Button } from '../../Component/Button';
import './ScheduleDetail.css';

const ScheduleDetail = ({
  schedulesForDay,
  selectedDay,
  monthNames,
  fetchSchedules,
}) => {
  console.log(schedulesForDay);
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

  return (
    <>
      <div className="calendar-detail-wrap">
        <div className="calendar-detail-header">
          <div className="calendar-detail-header-1">
            {selectedDay ? <>DAY {selectedDay.getDate()}</> : <></>}
          </div>
          <div className="calendar-detail-header-2">
            {selectedDay ? <>of {monthNames[selectedDay.getMonth()]}</> : <></>}
          </div>
        </div>
        <div className="calendar-detail-content-wrapper">
          {schedulesForDay && schedulesForDay.length > 0 ? (
            schedulesForDay.map((schedulesForDay, index) => (
              <>
                <div className="calendar-detail-content">
                  <div className="calendar-detail-content-title">
                    {schedulesForDay.title}
                  </div>
                  <div className="calendar-detail-content-time">
                    {schedulesForDay.startTime}~{schedulesForDay.endTime}
                  </div>
                  <div
                    className="calendar-detail-content-content"
                    style={{ backgroundColor: `${schedulesForDay.color}` }}
                  >
                    {schedulesForDay.memo ? <>{schedulesForDay.memo}</> : <></>}
                  </div>
                  <div className="button-area">
                    <Button
                      name="수정"
                      color="#E86161"
                      hoverColor="#D2625D"
                      onClick={() => handleDeleteSchedule(schedulesForDay.id)}
                    />
                    <Button
                      name="삭제"
                      color="#E86161"
                      hoverColor="#D2625D"
                      onClick={() => handleDeleteSchedule(schedulesForDay.id)}
                    />
                  </div>
                </div>
              </>
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

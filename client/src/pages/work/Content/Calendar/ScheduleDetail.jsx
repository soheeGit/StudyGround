import './ScheduleDetail.css';

const ScheduleDetail = (schedulesForDay) => {
  console.log(schedulesForDay);
  return (
    <>
      <div className="calendar-detail-wrap">
        <div className="calendar-detail-header">
          <div className="calendar-detail-header-1">DAY 4</div>
          <div className="calendar-detail-header-2">of March</div>
        </div>
        <div className="calendar-detail-content">
          <div className="calendar-detail-content-title">자치회 창고정리</div>
          <div className="calendar-detail-content-time">11:30~12:30</div>
          <div className="calendar-detail-content-content">qweqe</div>
        </div>
      </div>
    </>
  );
};
export default ScheduleDetail;

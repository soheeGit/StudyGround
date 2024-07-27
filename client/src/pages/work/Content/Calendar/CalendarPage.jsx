import { useEffect, useState } from 'react';
import WorkHeader from '../../WorkHeader';
import './CalendarPage.css';
import { Button } from '../../Component/Button';
import axios from 'axios';
import AddSchedule from './AddSchedule';
import { Outlet, useOutletContext } from 'react-router-dom';
import ScheduleDetail from './ScheduleDetail';

const CalendarPage = ({
  selectedDay,
  setSelectedDay,
  isPrevMonth,
  isNextMonth,
}) => {
  const { boardId } = useOutletContext();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 스케줄 데이터 get
  const [schedules, setSchedules] = useState([]);
  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`/calendar/allSchedule/${boardId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSchedules(response.data);
    } catch (error) {
      console.error('스케줄 데이터를 가져오는 중 오류 발생:', error);
    }
  };
  useEffect(() => {
    fetchSchedules();
    console.log(schedules);
  }, [boardId]);

  // 일정 추가 모달 state
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 새로 추가된 함수: 특정 날짜에 해당하는 스케줄을 반환
  const getScheduleForDay = (day) => {
    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.startDate);
      return isSameDay(scheduleDate, day);
    });
  };

  // 선택한 날짜와 오
  const isSameDay = (toDay, compareDay) => {
    if (
      toDay.getFullYear() === compareDay?.getFullYear() &&
      toDay.getMonth() === compareDay?.getMonth() &&
      toDay.getDate() === compareDay?.getDate()
    ) {
      return true;
    }
    return false;
  };
  const onClickDay = (day) => {
    if (isSameDay(day, selectedDay)) {
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
    }
  };

  // 달력 다음 달, 저번 달 버튼
  const prevCalendar = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        currentMonth.getDate()
      )
    );
  };
  const nextCalendar = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        currentMonth.getDate()
      )
    );
  };

  const buildCalendarDays = () => {
    // 이번달 시작 요일
    const curMonthStartDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    // 이번달 마지막 날짜
    const curMonthEndDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    // 저번달 마지막 날짜
    const prevMonthEndDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    );

    //다음 달 시작 날짜
    const nextMonthStartDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );

    const days = Array.from({ length: curMonthStartDate }, function (_, i) {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        prevMonthEndDate.getDate() - i
      );
    }).reverse();

    days.push(
      ...Array.from(
        { length: curMonthEndDate.getDate() },
        (_, i) =>
          new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
      )
    );
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      days.push(
        ...Array.from(
          { length: remainingDays },
          (_, i) =>
            new Date(
              nextMonthStartDate.getFullYear(),
              nextMonthStartDate.getMonth(),
              i + 1
            )
        )
      );
    }
    return days;
  };

  const buildCalendarTag = (calendarDays) => {
    return calendarDays.map((day, i) => {
      // 추가된 부분: 특정 날짜에 해당하는 스케줄을 가져옴
      const schedulesForDay = getScheduleForDay(day);
      if (day.getMonth() < currentMonth.getMonth()) {
        return (
          <td key={i} className="prevMonthDay">
            {isPrevMonth ? day.getDate() : ''}
          </td>
        );
      }
      if (day.getMonth() > currentMonth.getMonth()) {
        return (
          <td key={i} className="nextMonthDay">
            {isNextMonth ? day.getDate() : ''}
          </td>
        );
      }
      if (day < today) {
        return (
          <td key={i} className="prevDay">
            {day.getDate()}
          </td>
        );
      }
      return (
        <td
          key={i}
          className={`futureDay ${isSameDay(day, selectedDay) && 'choiceDay'}`}
          onClick={() => onClickDay(day)}
        >
          <div>{day.getDate()}</div>
          {/* 특정 날짜에 해당하는 스케줄을 렌더링 */}
          {schedulesForDay.map((schedule, idx) => (
            <div
              key={idx}
              className="schedule"
              style={{ backgroundColor: schedule.color }}
            >
              {schedule.title}
            </div>
          ))}
        </td>
      );
    });
  };

  const divideWeek = (calendarTags) => {
    return calendarTags.reduce((acc, day, i) => {
      if (i % 7 === 0) acc.push([day]);
      else acc[acc.length - 1].push(day);
      return acc;
    }, []);
  };

  const calendarDays = buildCalendarDays();
  const calendarTags = buildCalendarTag(calendarDays);
  const calendarRows = divideWeek(calendarTags);
  // 선택한 날짜에 해당하는 스케줄
  const schedulesForSelectedDay = selectedDay
    ? getScheduleForDay(selectedDay)
    : [];
  return (
    <>
      <WorkHeader title={'Calendar'} />
      <div className="year-box">{currentMonth.getFullYear()}</div>
      <Button name={'일정추가'} onClick={() => setShowModal(true)} />
      <div className="calendar-wrap">
        <div className="calendar-container">
          <div className="calendar-header">
            <Button name="이전 달" onClick={prevCalendar} />
            <div className="calendar-header-title">
              <div className="calendar-month-num">
                {currentMonth.getMonth() + 1}
              </div>
              <div className="calendar-month-en">March</div>
            </div>
            <Button name="다음 달" onClick={nextCalendar} />
          </div>
          <table className="claendar-table">
            <thead>
              <tr>
                {daysOfWeek.map((day, i) => (
                  <th key={i} data-testid="calendarHead">
                    {day}
                  </th>
                ))}{' '}
              </tr>
            </thead>
            <tbody className="calendar-body">
              {calendarRows.map((row, i) => (
                <tr key={i} id="calendar-week">
                  {row}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ScheduleDetail schedulesForDay={schedulesForSelectedDay} />
      </div>
      <AddSchedule
        show={showModal}
        onClose={() => setShowModal(false)}
        boardId={boardId}
      />
    </>
  );
};
export default CalendarPage;

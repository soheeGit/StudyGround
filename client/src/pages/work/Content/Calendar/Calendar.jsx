import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import WorkHeader from '../../WorkHeader';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const events = [
    { start: new Date(), end: new Date(), title: 'Special event' },
  ];

  return (
    <>
      <WorkHeader />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
};

export default BigCalendar;

import React from 'react';
import WorkHeader from '../../WorkHeader';
import { Calendar } from 'antd';

const MyCalendar = () => {
  return (
    <>
      <WorkHeader title="Calendar" />
      <Calendar headerRender="" />
    </>
  );
};

export default MyCalendar;

import React from 'react';
import { format } from 'date-fns';

// Fulldate -> 2024.03.30 오전 12:00
export const FormatFullDate = ({ dateString }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let formattedDate = format(date, 'yyyy.MM.dd a hh:mm ');
    formattedDate = formattedDate.replace('AM', '오전').replace('PM', '오후');
    return formattedDate;
  };

  return <span>{formatDate(dateString)}</span>;
};
// Month and Day -> 03 / 30
export const FormatMonthDay = ({ dateString }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let formattedDate = format(date, 'MM / dd');
    return formattedDate;
  };

  return <span>{formatDate(dateString)}</span>;
};

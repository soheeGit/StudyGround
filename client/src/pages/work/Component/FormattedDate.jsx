import React from 'react';
import { format } from 'date-fns';

const FormattedDate = ({ dateString }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let formattedDate = format(date, 'yyyy.MM.dd a hh:mm ');
    formattedDate = formattedDate.replace('AM', '오전').replace('PM', '오후');
    return formattedDate;
  };

  return <span>{formatDate(dateString)}</span>;
};

export default FormattedDate;

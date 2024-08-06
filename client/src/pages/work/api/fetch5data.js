import { useEffect, useState } from 'react';
import axios from 'axios';

// 상위 5개 공지사항 get
export const fetchNotice5 = async (boardId) => {
  const response = await axios.get(`/storage/currentNotice/${boardId}`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

// 상위 5개 메모 get
export const fetchMemo5 = async () => {
  const response = await axios.get(`/storage/currentMemo`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

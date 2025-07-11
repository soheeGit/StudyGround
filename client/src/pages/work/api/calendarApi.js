import axios from 'axios';

// 스케줄 데이터 get
export const fetchSchedules = async (boardId) => {
  const response = await axios.get(`/calendar/allSchedule/${boardId}`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

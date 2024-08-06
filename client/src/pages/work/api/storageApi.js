import axios from 'axios';

// 공지사항 데이터 get
export const fetchNotices = async (boardId) => {
  const response = await axios.get(`/storage/notice/${boardId}`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const sortedResponse = response.data.sort((a, b) =>
    b.importance === 'High' ? 1 : -1
  );
  return sortedResponse;
};

// 공지사항 추가 post
export const addNotice = async ({ boardId, formData }) => {
  const response = await axios.post(
    `/storage/submitNotice/${boardId}`,
    formData,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

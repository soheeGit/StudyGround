import axios from 'axios';

export const fetchFiles = async (boardId) => {
  try {
    const response = await axios.get(`/storage/fileStorage/${boardId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.fileStorages);
    return response.data.fileStorages;
  } catch (error) {
    console.log('파일데이터를 가져오는 중 오류 발생', error);
  }
};

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

export const fetchFiles5 = async (boardId) => {
  try {
    const response = await axios.get(`/storage/fileStorage/${boardId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.fileStorages);
    const validFiles = response.data.fileStorages.filter(
      (item) => item.files.length > 0
    );
    const files5 = validFiles.slice(0, 5);
    console.log(files5);
    return files5;
  } catch (error) {
    console.log('파일 상위 5개 데이터를 가져오는 중 오류 발생', error);
    return [];
  }
};

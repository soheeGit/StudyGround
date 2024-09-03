import axios from 'axios';
import Modal from '../../../Component/MyModal';
import { useRef, useState } from 'react';
import { Button } from '../../../Component/Button';

const AddFile = ({ boardId, fetchFiles }) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  // 파일 선택 처리 함수
  const handleFileChange = async (event) => {
    setFiles([...files, ...event.target.files]);
    console.log(files);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      // 파일 업로드 API 호출
      const response = await axios.post(
        `/storage/submitFiles/${boardId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('파일 업로드 성공:', response.data);
      alert('파일이 성공적으로 업로드되었습니다.');
      fetchFiles();
    } catch (error) {
      console.error('파일 업로드 오류:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  };

  // 파일 선택 창 열기
  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="file-upload-container">
      {/* 숨겨진 파일 입력 요소 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // 입력 필드를 숨김
      />
      {/* 파일 선택 창을 여는 버튼 */}
      <Button name="파일 업로드" onClick={openFileDialog} color={'#7ed321'} />
    </div>
  );
};
export default AddFile;

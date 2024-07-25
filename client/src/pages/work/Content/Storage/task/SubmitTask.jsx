import axios from 'axios';
import { Button } from '../../../Component/Button';
import './TaskDetail.css';
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';

const SubmitTask = () => {
  const host = 'http://localhost:3000';
  const location = useLocation();
  const navigate = useNavigate();
  const { task } = location.state || {}; //location.state로 부터 task 데이터를 가져옴
  const { boardId, fetchTasksRef } = useOutletContext();
  const taskId = useParams();

  //   // 과제 삭제
  //   const handleDeleteTask = async () => {
  //     try {
  //       const response = await axios.get(`/storage/deleteTask/${taskId.taskId}`, {
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       if (response.data.success) {
  //         alert('과제가 성공적으로 삭제되었습니다.');
  //         if (fetchTasksRef.current) {
  //           fetchTasksRef.current();
  //         }
  //         navigate(`../`);
  //       } else {
  //         alert('과제 삭제 실패했습니다.');
  //       }
  //     } catch (error) {
  //       console.error('과제 삭제 중 오류 발생:', error);
  //       alert('과제 삭제 중 오류가 발생했습니다.');
  //     }
  //   };

  return (
    <div className="detail-container">
      <div className="detail-field">
        <textarea
          style={{ width: '100%', height: '400px' }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해 주세요"
        />
      </div>
      <div className="divider-row"></div>
      <div className="detail-contentType">{task.content}</div>
      <div className="attachmentType">첨부파일 ({task.files.length}개)</div>
      {task.files.map((file, fileKey) => (
        <div className="attachment-box">
          <a
            href={`${host}/files/${file.fileName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {file.fileName}
          </a>
        </div>
      ))}
      <div className="divider-row"></div>
      <div className="buttonsArea">
        <Button
          name="수정"
          color="#3D9BF3"
          onClick={() =>
            navigate(`../${taskId.taskId}/update`, { state: { task } })
          }
          hoverColor="#5AA7F6"
        />
        <Button
          name="삭제"
          color="#E86161"
          onClick={handleDeleteTask}
          hoverColor="#D2625D"
        />
        <Button
          name="제출"
          color="#E86161"
          // onClick={handleDeleteTask}
          hoverColor="#D2625D"
        />
        <Button
          name="목록"
          color="#D9D9D9"
          onClick={() => navigate('../')}
          hoverColor="#E0E0E0"
        />
      </div>
    </div>
  );
};
export default NoticeDetail;

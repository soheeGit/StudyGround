import { useEffect, useState } from 'react';
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
import FormattedDate from '../../../Component/FormattedDate';
import SubmitTask from './SubmitTask';
import Divider from '../../../Component/Divider';

const NoticeDetail = () => {
  const host = 'http://localhost:3000';
  const location = useLocation();
  const navigate = useNavigate();
  const { task } = location.state || {}; //location.state로 부터 task 데이터를 가져옴
  const { boardId, fetchTasksRef } = useOutletContext();
  const taskId = useParams();

  // 과제 제출
  const [submitTask, setSubmitTask] = useState(null); // 제출 내역 상태
  const [content, setContent] = useState(''); // 제출 내용 상태
  const [files, setFiles] = useState([]); // 제출 파일 상태
  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };
  // 과제 제출상태 확인 및 get
  useEffect(() => {
    const fetchSubmitTask = async () => {
      try {
        const response = await axios.get(
          `/storage/submitTask/${taskId.taskId}`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.data.success) {
          setSubmitTask(response.data.submitTask);
        }
      } catch (error) {
        console.error('과제 제출 내역을 가져오는 중 오류 발생:', error);
      }
    };
    fetchSubmitTask();
  }, [taskId]);

  // 과제 삭제
  const handleDeleteTask = async () => {
    try {
      const response = await axios.get(`/storage/deleteTask/${taskId.taskId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('과제가 성공적으로 삭제되었습니다.');
        if (fetchTasksRef.current) {
          fetchTasksRef.current();
        }
        navigate(`../`);
      } else {
        alert('과제 삭제 실패했습니다.');
      }
    } catch (error) {
      console.error('과제 삭제 중 오류 발생:', error);
      alert('과제 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="detail-container">
      <div className="detail-field">
        <div className="detail-field-title">제목</div>
        <div className="divider-column"></div>
        <div className="detail-field-content">{task.title}</div>
      </div>
      <div className="detail-field">
        <div className="detail-field-title">게시일</div>
        <div className="divider-column"></div>
        <div className="detail-field-content">
          <FormattedDate dateString={task.createdAt} />
        </div>
      </div>
      <div className="detail-field">
        <div className="detail-field-title">마감일</div>
        <div className="divider-column"></div>
        <div className="detail-field-content">
          <FormattedDate dateString={task.deadline} />
        </div>
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
      </div>

      {/* 과제 제출 영역 */}
      <div className="submit-title">Submit</div>
      <Divider color="#000000" height={'2px'} margin={'10px'} />
      <div className="submit-container">
        <SubmitTask />
      </div>
      <div className="buttonsArea">
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

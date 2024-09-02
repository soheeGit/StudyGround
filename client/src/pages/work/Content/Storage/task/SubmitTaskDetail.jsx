import './SubmitTaskDetail.css';
import { Button } from '../../../Component/Button';
import Divider from '../../../Component/Divider';
import { FormatFullDate } from '../../../Component/FormattedDate';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { mdeleteTask } from '../../../api/taskApi';

const SubmitTaskDetail = ({ submitTasks }) => {
  console.log(submitTasks);
  const navigate = useNavigate();
  const host = 'http://localhost:5000';

  // 내 제출한 과제 확인
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData.user.id;
  return (
    <>
      {submitTasks && submitTasks.length > 0 ? (
        submitTasks.map((submitTask, key) => (
          <>
            <Divider color="#000000" height={'2px'} margin={'10px'} />
            <div className="submitTaskDetail-container">
              <div className="submitTaskDetail-row">
                <div className="submitTaskDetail-row-1">작성자</div>
                <div className="divider-column"></div>
                {submitTask.User.uName}
              </div>
              <div className="submitTaskDetail-row">
                <div className="submitTaskDetail-row-1">제출일시</div>
                <div className="divider-column"></div>
                <FormatFullDate dateString={submitTask.updatedAt} />
              </div>
              <div className="submitTaskDetail-content">
                {submitTask.content}
              </div>
              <div className="submitTaskDetail-row">
                <div className="submitTaskDetail-row-1">
                  첨부파일 ({submitTask.files.length})개
                </div>
                {submitTask.files.map((file, key) => (
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
              </div>
              <div className="buttonsArea">
                {submitTask.userId === userId ? (
                  <>
                    <Button name="수정" color="#3D9BF3" hoverColor="#5AA7F6" />
                    <Button
                      name="삭제"
                      color="#E86161"
                      hoverColor="#D2625D"
                      onClick={() => mdeleteTask(submitTask.taskId)}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ))
      ) : (
        <></>
      )}
    </>
  );
};
export default SubmitTaskDetail;

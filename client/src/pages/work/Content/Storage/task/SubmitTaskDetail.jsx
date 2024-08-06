import './SubmitTaskDetail.css';
import { Button } from '../../../Component/Button';
import Divider from '../../../Component/Divider';
import { FormatFullDate } from '../../../Component/FormattedDate';
import { useNavigate } from 'react-router-dom';

const SubmitTaskDetail = ({ submitTasks }) => {
  console.log(submitTasks);
  const navigate = useNavigate();

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
                {submitTask.userId}
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
                <div className="submitTaskDetail-row-1">첨부파일</div>
                {submitTask.files.fileName}
              </div>
              <div className="buttonsArea">
                {submitTask.userId === userId ? (
                  <>
                    <Button name="수정" color="#3D9BF3" hoverColor="#5AA7F6" />
                    <Button name="삭제" color="#E86161" hoverColor="#D2625D" />
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

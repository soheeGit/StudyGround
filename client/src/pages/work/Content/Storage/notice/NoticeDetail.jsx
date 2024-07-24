import './NoticeDetail.css';
import { useLocation } from 'react-router-dom';

const NoticeDetail = () => {
  const location = useLocation();
  const { notice } = location.state || {}; //location.state로 부터 notice 데이터를 가져옴
  console.log(notice);
  return (
    <div className="detail-container">
      <div className="detail-field">
        <div className="detail-field-title">제목</div>
        <div className="divider-column"></div>
        <div className="detail-field-content">{notice.title}</div>
      </div>
      <div className="detail-field">
        <div className="detail-field-title">작성자</div>
        <div className="divider-column"></div>
        <div className="detail-field-content"></div>
      </div>
      <div className="detail-field">
        <div className="detail-field-title">개재일시</div>
        <div className="divider-column"></div>
        <div className="detail-field-content">ㅂㅈㄷㅂㅂㄷㅈ</div>
      </div>
      <div className="detail-field">
        <div className="detail-field-title">조회수</div>
        <div className="divider-column"></div>
        <div className="detail-field-content">ㅂㅈㄷㅂㅂㄷㅈ</div>
      </div>
      <div className="divider-row"></div>
      <div className="detail-contentType">{notice.content}</div>
      <div className="attachmentType">첨부파일 ({notice.files.length}개)</div>
      {notice.files.map((file, fileKey) => (
        <div>{file.fileName}</div>
      ))}
    </div>
  );
};
export default NoticeDetail;

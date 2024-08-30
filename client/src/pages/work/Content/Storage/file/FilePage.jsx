import React, { useEffect, useRef, useState } from 'react';
import './FilePage.css';
import WorkHeader from '../../../WorkHeader';
import axios from 'axios';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import clip from '../../../../../assets/clip.png';
import star from '../../../../../assets/star.png';
import nostar from '../../../../../assets/nostar.png';
import { Button } from '../../../Component/Button';
import AddFile from './AddFile';
import styled from 'styled-components';

const FilePage = () => {
  const { boardId } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOutletVisible, setIsOutletVisible] = useState(false); // Outlet 활성화 상태

  // 파일 데이터
  const [files, setFiles] = useState([]);
  // const [selectedNotice, setSelectedNotice] = useState(null);

  // 현재 URL이 /addnotice인 경우 Outlet 활성화
  // useEffect(() => {
  //   if (
  //     location.pathname.includes('/notice/addnotice') ||
  //     /\/notice\/\d+/.test(location.pathname)
  //   ) {
  //     setIsOutletVisible(true);
  //   } else {
  //     setIsOutletVisible(false);
  //   }
  // }, [location]);

  // 파일 데이터 get
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`/storage/StudyMaterial/${boardId}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setFiles(response.data);
      } catch (error) {
        console.error('파일 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchFiles();
  }, [boardId]);

  // // 파일 상세확인 : NopticeDetail로 notice데이터 넘겨준다
  // const handleClickNotice = (notice) => {
  //   navigate(`/work/${boardId}/notice/${notice.id}`, { state: { notice } });
  // };

  return (
    <>
      {/* header */}
      <WorkHeader title="Storage" />
      <div className="task-header-container">File</div>
      <hr id="divider" />

      {/* body */}
      <div className="filter-box"></div>
      <div className="my-container">
        <AddFile boardId={boardId} />
        <div className="table-header-container">
          <div className="table-header-1">순번</div>
          <div className="table-header-2">이름</div>
          <div className="table-header-3">수정일</div>
          <div className="table-header-4">유형</div>
          <div className="table-header-5">크기</div>
        </div>
        {/* {files && files.length > 0 ? (
          files.map((file, fileKey) => (
            <div className="table-content-container">
              <div className="table-content-1">{file.fileKey}</div>
              <div className="table-content-2">{file.fileName}</div>
              <div className="table-content-3">123131</div>
              <div className="table-content-4">13131</div>
              <div className="table-content-5">13131</div>
            </div>
          ))
        ) : (
          <></>
        )} */}
      </div>
    </>
  );
};
export default FilePage;

const AddFileButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2px;
`;

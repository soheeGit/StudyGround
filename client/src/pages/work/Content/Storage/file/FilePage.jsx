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
import { FormatFullDate } from '../../../Component/FormattedDate';
import { FaRegImage } from 'react-icons/fa6';
import { FaFilePdf } from 'react-icons/fa';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import { fetchFiles } from '../../../api/fileStorageApi';

const FilePage = () => {
  const { boardId } = useOutletContext();
  const host = 'http://localhost:5000';
  const location = useLocation();
  const navigate = useNavigate();
  const [isOutletVisible, setIsOutletVisible] = useState(false); // Outlet 활성화 상태

  // 파일 데이터 get
  const {
    data: files,
    isLoading: isFilesLoading,
    isError: isFilesError,
    refetch,
  } = useQuery({
    queryKey: ['files', boardId],
    queryFn: () => fetchFiles(boardId),
  });
  console.log(files);

  // 파일 크기 포맷팅 함수
  const formatFileSize = (bytes) => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  // 파일 형식 추출 함수
  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop();
    return extension ? extension.toUpperCase() : 'UNKNOWN';
  };

  const selectIcon = (fileName) => {
    const extension = fileName.split('.').pop();
    if (extension === 'png') {
      return <FaRegImage />;
    } else if (extension === 'pdf') {
      return <FaFilePdf />;
    } else if (extension === 'xlsx') {
      return <RiFileExcel2Fill />;
    } else {
      return <HiOutlineDocumentText />;
    }
  };

  return (
    <>
      {/* header */}
      <WorkHeader title="Storage" />
      <div className="task-header-container">File</div>
      <hr id="divider" />

      {/* body */}
      <div className="filter-box"></div>
      <div className="my-container">
        <AddFileWrap>
          <AddFile boardId={boardId} fetchFiles={refetch} />
        </AddFileWrap>
        <div className="table-header-container">
          <div className="table-header-1">순번</div>
          <div className="table-header-2">이름</div>
          <div className="table-header-3">수정일</div>
          <div className="table-header-4">유형</div>
          <div className="table-header-5">크기</div>
        </div>
        <TableContent>
          {files && files.length > 0 ? (
            files.map((file, key) => {
              const fileData = file.files && file.files[0]; // 파일이 있는지 확인
              if (!fileData) return null; // 파일 데이터가 없으면 렌더링하지 않음
              return (
                <>
                  <a
                    href={`${host}/files/${file.files[0].fileName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="file-row">
                      <div className="row1">
                        {selectIcon(file.files[0].fileName)}
                      </div>
                      <div className="row2">{file.files[0].fileName}</div>
                      <div className="row3">
                        <FormatFullDate dateString={file.files[0].updatedAt} />
                      </div>
                      <div className="row4">
                        {getFileType(file.files[0].fileName)}
                      </div>
                      <div className="row5"></div>
                    </div>
                  </a>
                </>
              );
            })
          ) : (
            <></>
          )}
        </TableContent>
      </div>
    </>
  );
};
export default FilePage;
const AddFileWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
`;

const AddFileButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2px;
`;

const TableContent = styled.div`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
  }
`;

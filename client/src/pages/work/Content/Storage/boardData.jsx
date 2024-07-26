import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {
  const [studies, setStudies] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupResponse = await axios.get('/api/myBoard', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setStudies(groupResponse.data);
      } catch (error) {
        console.error('스터디리스트를 가져오는 중 오류 발생:', error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div>
      내 스터디 목록입니다.
      {studies && studies.length > 0 ? (
        studies.map((study) => (
          <div key={study.bId}>
            <Link to={`/work/${study.bId}/dashboard`}>링크 입니다</Link>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default BoardList;

import './GroupSelector.css';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GroupSelector() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupResponse = await axios.get('/api/myBoard', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setGroups(groupResponse.data);
        console.log(groupResponse.data);
      } catch (error) {
        console.error('스터디리스트를 가져오는 중 오류 발생:', error);
      }
    };

    fetchGroups();
  }, []);

  // // 로딩 상태 처리
  // if (isLoading) {
  //   return <div> Lodaing ... </div>;
  // }

  // // 오류 상태 처리
  // if (error) {
  //   return <div>Error : {error.message}</div>;
  // }

  // 데이터 x
  // if (!data || data.length === 0) {
  //   return <div>NO Data for your groups</div>;
  // }
  const handleSelect = (event) => {
    setSelectedGroup(event.target.value);
    if (selectedGroup) {
      navigate(`/work/${selectedGroup}/dashboard`);
    }
  };

  return (
    <div className="select-container">
      <select value={selectedGroup} onChange={handleSelect}>
        <option value="">스터디를 선택하세요</option>
        {groups && groups.length > 0 ? (
          groups.map((group) => (
            <option key={group.id} value={group.bId}>
              {group.bName}
            </option>
          ))
        ) : (
          <></>
        )}
      </select>
    </div>
  );
}

export default GroupSelector;

import './GroupSelector.css';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchGroups = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Data fetching Error...');
  }
  return response.json();
};

function GroupSelector() {
  const [selectedGroup, setSelectedGroup] = useState();
  const {
    data: groups,
    error,
    isLoading,
  } = useQuery({
    queryKey: 'groups',
    queryFn: fetchGroups,
  });

  // 로딩 상태 처리
  if (isLoading) {
    return <div> Lodaing ... </div>;
  }

  // 오류 상태 처리
  if (error) {
    return <div>Error : {error.message}</div>;
  }

  // 데이터 x
  // if (!data || data.length === 0) {
  //   return <div>NO Data for your groups</div>;
  // }
  const handleSelect = (event) => {
    setSelectedGroup(event.target.value);
  };

  return (
    <div className="select-container">
      <select value={selectedGroup} onChange={handleSelect}>
        <option value="">스터디를 선택하세요</option>
        {groups.map((group) => (
          <option key={group.id} value={group.title}>
            {group.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GroupSelector;

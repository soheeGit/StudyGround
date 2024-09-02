// 로그인 후 Mid 필터
import './Search.css';
import React, { useState } from 'react';

function Search_Mid({ onFilterChange }) {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    if (typeof onFilterChange === 'function') {
      onFilterChange(filter);
    } else {
      console.error('필터 기능이 작동되지 않습니다.');
    }
  };

  return (
    <div className="container">
      <div className="item">
        <button
          className={`option ${selectedFilter === '전체' ? 'active' : ''}`}
          onClick={() => handleFilterClick('전체')}
        >
          전체
        </button>
        <button
          className={`option ${selectedFilter === '어학' ? 'active' : ''}`}
          onClick={() => handleFilterClick('어학')}
        >
          어학
        </button>
        <button
          className={`option ${selectedFilter === '취업' ? 'active' : ''}`}
          onClick={() => handleFilterClick('취업')}
        >
          취업
        </button>
        <button
          className={`option ${
            selectedFilter === '고시/공무원' ? 'active' : ''
          }`}
          onClick={() => handleFilterClick('고시/공무원')}
        >
          고시/공무원
        </button>
        <button
          className={`option ${
            selectedFilter === '프로그래밍' ? 'active' : ''
          }`}
          onClick={() => handleFilterClick('프로그래밍')}
        >
          프로그래밍
        </button>
        <button
          className={`option ${selectedFilter === '취미/교양' ? 'active' : ''}`}
          onClick={() => handleFilterClick('취미/교양')}
        >
          취미/교양
        </button>
        <button
          className={`option ${selectedFilter === '기타' ? 'active' : ''}`}
          onClick={() => handleFilterClick('기타')}
        >
          기타
        </button>
      </div>
    </div>
  );
}

export default Search_Mid;

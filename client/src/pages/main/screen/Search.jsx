import './Search.css';
import React, { useState } from 'react';

function Search() {
    const [selectedFilter, setSelectedFilter] = useState(null); 
    const [showOptions, setShowOptions] = useState(false);

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter); 
    }

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className="container">
            <div className='main-name'>
                <p className='large-text'>Recruits</p>
                <p className='small-text'>스터디원 모집 중</p>
            </div>
        
            <div className='item'>
                <button className={`option ${selectedFilter === "전체" ? "active" : ""}`} onClick={() => handleFilterClick("전체")}>전체</button>
                <button className={`option ${selectedFilter === "어학" ? "active" : ""}`} onClick={() => handleFilterClick("어학")}>어학</button>
                <button className={`option ${selectedFilter === "취업" ? "active" : ""}`} onClick={() => handleFilterClick("취업")}>취업</button>
                <button className={`option ${selectedFilter === "고시/공무원" ? "active" : ""}`} onClick={() => handleFilterClick("고시/공무원")}>고시/공무원</button>
                <button className={`option ${selectedFilter === "프로그래밍" ? "active" : ""}`} onClick={() => handleFilterClick("프로그래밍")}>프로그래밍</button>
                <button className={`option ${selectedFilter === "취미/교양" ? "active" : ""}`} onClick={() => handleFilterClick("취미/교양")}>취미/교양</button>
                <button className={`option ${selectedFilter === "기타" ? "active" : ""}`} onClick={() => handleFilterClick("기타")}>기타</button>
            </div>
        </div>
    );
}

export default Search;

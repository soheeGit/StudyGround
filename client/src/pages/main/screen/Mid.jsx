import './Mid.css';
import CustomModal2 from '../Modal/Modal2'; 
import React, { useState, useEffect } from 'react';

function Mid() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(""); // 새로운 state 추가
    const [board, setBoard] = useState(null);
    const [studyGroups, setStudyGroups] = useState([]); // 새로운 state 추가

    const openModal = (title) => { // title 인자 추가
        setSelectedTitle(title); // 클릭한 title을 상태에 저장
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        // Fetch data from the API
        fetch('/api/boards')
          .then(response => response.json())
          .then(data => {
              const selectedBoard = data[0];
              setBoard(selectedBoard);
              setStudyGroups(data); // API에서 받아온 데이터를 studyGroups 상태에 저장
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
    }, []);

    const addStudyGroup = (newGroup) => {
        setStudyGroups([...studyGroups, newGroup]);
    };

    if (!board) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="recruit">
            <ul className="box-list">
                <li className='box'>
                <div className='title' onClick={() => openModal("")}><b>{board.bName}</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>{board.bCurrentNumber} / {board.bTotalNumber}</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>
                
                <li className='box'>
                <div className='title' onClick={() => openModal("적성고사 스터디방")}><b>적성고사 스터디방</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>30 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>

                <li className='box'>
                <div className='title' onClick={() => openModal("임용고사 스터디방")}><b>임용고사 스터디방</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>25 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>

                <li className='box'>
                <div className='title' onClick={() => openModal("해외주식 공부방")}><b>해외주식 공부방</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>8 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>

                <li className='box'>
                <div className='title' onClick={() => openModal("7급 공무원을 위하여")}><b>7급 공무원을 위하여</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>6 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>

                <li className='box'>
                <div className='title' onClick={() => openModal("중국어 스터디")}><b>중국어 스터디</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>50 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>

                <li className='box'>
                <div className='title' onClick={() => openModal("타로사주 정보공유방")}><b>타로사주 정보공유방</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>10 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>

                <li className='box'>
                <div className='title' onClick={() => openModal("간호조무사 스터디방")}><b>간호조무사 스터디방</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>10 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>

                <li className='box'>
                <div className='title' onClick={openModal}><b>경찰공무원 스터디원 모집</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>10 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>

                <li className='box'>
                <div className='title' onClick={openModal}><b>경찰공무원 스터디원 모집</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>10 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>

                <li className='box'>
                <div className='title' onClick={openModal}><b>경찰공무원 스터디원 모집</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>10 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>

                <li className='box'>
                <div className='title' onClick={openModal}><b>경찰공무원 스터디원 모집</b></div>
                    <div className='user-info'>        
                        <div className='info'>
                            <div className='count'>10 / 100</div>
                        </div>
                        <div className='detail'>
                        </div>
                    </div>
                </li>
            </ul>
            <CustomModal2 isOpen={modalIsOpen} onRequestClose={closeModal} selectedTitle={selectedTitle}/>
        </div>
    );
}

export default Mid;

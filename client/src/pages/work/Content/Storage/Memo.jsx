import './Memo.css';
import storage3 from '../../../../assets/storage3.png';
import { FaPlus } from 'react-icons/fa6';
import WorkHeader from '../../WorkHeader';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MemoDetail from './MemoDetail';
import AddMemoModal from './AddMemo';

const Memo = () => {
  // 기존 메모 데이터
  const [memos, setMemos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMemo, setSelectedMemo] = useState('');
  // const handleSelectedMemo = (memo) => {
  //   setSelectedMemo(memo);
  //   console.log(selectedMemo);
  // };

  // 메모 추가
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const handleOpenAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const handleAddMemo = async (memo) => {
    try {
      const response = await axios.post('/storage/submitMemo', memo, {
        withCredentials: true,
      });
      setMemos([...memos, response.data.memo]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('메모를 추가하는 중 오류 발생:', error);
    }
  };

  // 메모 상세보기
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModal = (memo) => {
    setSelectedMemo(memo);
    setModalIsOpen(true);
    console.log(selectedMemo);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setModalIsOpen(null);
  };

  // 메모 fetch
  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const memoResponse = await axios.get('/storage/memo', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setMemos(memoResponse.data);
        console.log(memoResponse.data);
      } catch (error) {
        console.error('메모 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemos();
  }, []);

  /* 메모 수정 */
  const handleUpdateMemo = (id, newTitle, newContent) => {
    setMemos(
      memos.map((memo) =>
        memo.id === id
          ? { ...memo, title: newTitle, content: newContent }
          : memo
      )
    );
  };

  // 메모 삭제
  const handleDeleteMemo = (id) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  return (
    <>
      <WorkHeader title="Storage" />
      <div className="memo-container">
        <div className="tab-header">
          <div className="tab-header-img">
            <img src={storage3} width={'50px'} />
          </div>
          <p>Memo</p>
          <div className="add-memo-button-container">
            <button onClick={() => handleOpenAddModal()}>추가</button>
          </div>
        </div>
        <div className="memo-content">
          <h2>오늘</h2>
          {/* map postion */}
          {memos.map((memo, memoId) => (
            <div className="today-memo-box" key={memo.id}>
              <div className="today-memo-box-left">
                <div className="today-memo-title">{memo.title}</div>
                <div className="today-memo-content">
                  <div className="edit-time"></div>
                  <div className="this-memo-content">{memo.content}</div>
                </div>
              </div>
              <div className="edit-button-container">
                <button>수정</button>
                <button onClick={() => handleOpenModal(memo)}>상세</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddMemoModal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        onSubmit={handleAddMemo}
      />
      {selectedMemo && (
        <MemoDetail
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          data={selectedMemo}
          onUpdate={handleUpdateMemo}
          onDelete={handleDeleteMemo}
        />
      )}
    </>
  );
};
export default Memo;

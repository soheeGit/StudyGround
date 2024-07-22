import './Memo.css';
import storage3 from '../../../../assets/storage3.png';
import { FaPlus } from 'react-icons/fa6';
import WorkHeader from '../../WorkHeader';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../../../config';
import MemoDetail from './MemoDetail';
import AddMemoModal from './AddMemo';

const Memo = () => {
  // memo data
  const [memos, setMemos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMemo, setSelectedMemo] = useState('');
  // const handleSelectedMemo = (memo) => {
  //   setSelectedMemo(memo);
  //   console.log(selectedMemo);
  // };

  /* <AddMemoModal>*/
  const [addModalIsOpen, setAddModalIsOpen] = useState(false); // AddMemoModal isOpen state
  const handleOpenAddModal = () => {
    setAddModalIsOpen(true);
  };
  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };
  /* <AddMemoModal />*/

  // 메모 수정
  // 메모 수정 -end
  /* <MemoDetail Open> */
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
  /* <MemoDetail Open /> */

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const memoResponse = await axios.get(`${API.GETMEMO}`, {
          withCredentials: true,
          headers: {
            Accept: 'application/json, text/plain, */*',
          },
        });
        setMemos(memoResponse.data);
      } catch (error) {
        console.error('메모 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMemos();
  }, []);

  const handleAddMemo = async () => {
    try {
      const response = await axios.post(
        `${API.ADDMEMO}`,
        {
          title,
          content,
        },
        {
          withCredentials: true,
        }
      );
      setMemos([...memos, response.data.memo]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('메모를 추가하는 중 오류 발생:', error);
    }
  };

  /* Update Memo */
  const handleUpdateMemo = (id, newTitle, newContent) => {
    setMemos(
      memos.map((memo) =>
        memo.id === id
          ? { ...memo, title: newTitle, content: newContent }
          : memo
      )
    );
  };

  /* Update Memo -end*/

  /* memo data 삭제 */
  const handleDeleteMemo = (id) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  /* dummy memo data */
  const dummy_memo = [
    {
      id: 1,
      title: '장보기',
      content: 'qweqweasdasdasda',
      edit_time: {
        time: '07-40',
        date: '2024-06-30',
      },
    },
  ];

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
          {dummy_memo.map((memo, memoId) => (
            <div className="today-memo-box" key={memo.id}>
              <div className="today-memo-box-left">
                <div className="today-memo-title">{memo.title}</div>
                <div className="today-memo-content">
                  <div className="edit-time">{memo.edit_time.time}</div>
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

import './Memo.css';
import storage3 from '../../../../assets/storage3.png';
import { FaPlus } from 'react-icons/fa6';
import WorkHeader from '../../WorkHeader';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../../../config';

const Memo = () => {
  // memo data
  const [memos, setMemos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMemo, setSelectedMemo] = useState('');
  const handleSelectedMemo = (memo) => {
    setSelectedMemo(memo);
    console.log(selectedMemo);
  };
  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const memoResponse = await axios.get(`${API.GETMEMO}`, {
          withCredentials: false,
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

  return (
    <>
      <h2>새 메모 추가</h2>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAddMemo}>추가</button>
      <WorkHeader title="Storage" />
      <div className="memo-container">
        <div className="tab-header">
          <div className="tab-header-img">
            <img src={storage3} width={'50px'} />
          </div>
          <p>Memo</p>
        </div>
        <div className="memo-content" onClick={handleSelectedMemo}>
          <h2>오늘</h2>
          {/* map postion */}
          {/* {memos.map((memo) => (
            <div className="today-memo-box" key={memo.id}>
              <div className="today-memo-title">{memo.title}</div>
              <div className="today-memo-content">
                <div className="edit-time">{memo.edit_time.time}</div>
                <div className="this-memo-content">{memo.content}</div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
};
export default Memo;

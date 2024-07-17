import './Memo.css';
import storage3 from '../../../../assets/storage3.png';
import { FaPlus } from 'react-icons/fa6';
import WorkHeader from '../../WorkHeader';
import { Card } from 'antd';
import { useState } from 'react';

const Memo = () => {
  /* dummy data */
  const dummy_memo = [
    {
      title: 'memo 구현하기',
      date: '2024-07-17',
      edit_time: {
        date: '2024-07-18',
        time: '07:30',
      },
      content: 'Storage탭의 memo기능 구현하기',
    },
  ];
  const [selectedMemo, setSelectedMemo] = useState('');
  const handleSelectedMemo = (memo) => {
    setSelectedMemo(memo);
    console.log(selectedMemo);
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
        </div>
        <div className="memo-content" onClick={handleSelectedMemo}>
          <h2>오늘</h2>
          {/* map postion */}
          {dummy_memo.map((memo) => (
            <div className="today-memo-box" key={memo.id}>
              <div className="today-memo-title">{memo.title}</div>
              <div className="today-memo-content">
                <div className="edit-time">{memo.edit_time.time}</div>
                <div className="this-memo-content">{memo.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Memo;

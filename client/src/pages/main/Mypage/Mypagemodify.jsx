import React from 'react';
import Sidebar from '../../work/sidebar/Sidebar';
import './Mypagemodify.css';

const Mypage = () => {
  return (
    <>
      <Sidebar />
      <div className="mypage_wrap">
        <div className="mypage_title">내 정보</div>
        <div className="mypage_info">
          <div className="profile">
            <img
              src="profile_image_url"
              alt="Profile"
              className="profile_image"
            />
            <div className="profile_details">
              이름 <br />
              성격유형
            </div>

            <button className="mypage_edit_complete">변경하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;

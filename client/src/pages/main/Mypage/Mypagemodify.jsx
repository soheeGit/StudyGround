import React, { useState } from 'react';
import Sidebar from '../../work/sidebar/Sidebar';
import useUserData from './useUserData';
import './Mypagemodify.css';
import { useNavigate } from 'react-router-dom';

const Mypagemodify = () => {
  const navigate = useNavigate();
  const userData = useUserData();
  const [uName, setUName] = useState(userData.uName || '');
  const [uType, setUType] = useState(userData.uType || '');
  const [profileImage, setProfileImage] = useState(userData.profileImage || '');
  const [file, setFile] = useState(null);

  const handleNameChange = (e) => setUName(e.target.value);
  const handleTypeChange = (e) => setUType(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleImageUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/profile/img', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const result = await response.json();
      console.log('Image upload response:', result); // Log the server response
      if (result.url) {
        setProfileImage(result.url);
        console.log('Profile image updated successfully:', result.url);
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/profile/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          uName,
          uType,
          profileImage,
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Profile updated successfully:', result.user);
        alert('프로필이 업데이트 되었습니다.');
        navigate('/Mypage');
      } else {
        console.error('Profile update failed');
        alert('프로필이 업데이트 실패했습니다..');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="mypage_wrap">
        <div className="mypage_title">내 정보</div>
        <div className="mpm_info">
          <div className="mpm_profile">
            <img
              src={profileImage || 'default_profile_image_url'}
              alt="Profile"
              className="mpm_profile_image"
            />
            <div className="mpm_profile_details">
              {userData.uName} ({userData.uId}) <br />
              {userData.uLevel} · {userData.uType}
            </div>
          </div>

          <div className="profile_nickname_edit">
            <label className="profile_nickname">
              이름
              <input
                className="nickname_edit"
                type="text"
                value={uName}
                onChange={handleNameChange}
              />
            </label>
          </div>

          <div className="profile_nickname_edit">
            <label className="profile_team">
              팀 프로젝트
              <br />
              유형
              <input
                className="nickname_edit"
                type="text"
                value={uType}
                onChange={handleTypeChange}
              />
            </label>
          </div>

          <div className="profile_nickname_edit">
            프로필 사진
            <input type="file" onChange={handleFileChange} />
            <button className="myprofile_edit" onClick={handleImageUpload}>
              편집
            </button>
            <button className="myprofile_delete">삭제</button>
          </div>

          <button className="mypage_edit" onClick={handleSubmit}>
            변경하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Mypagemodify;

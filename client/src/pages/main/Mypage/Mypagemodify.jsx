import React, { useState, useEffect } from 'react';
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
  const [preview, setPreview] = useState(null);

  const typecategoryOptions = [
    '선구자',
    '탐구자',
    '지도자',
    '추진자',
    '수행자',
    '완주자',
    '환기자',
    '전문가',
    '전략판단가',
  ];

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleNameChange = (e) => setUName(e.target.value);
  const handleTypeChange = (e) => setUType(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleImageUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('img', file);

    try {
      const response = await fetch('/profile/img', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const result = await response.json();
      if (result.url) {
        setProfileImage(result.url);
        console.log('프로필 이미지 업데이트 성공:', result.url);
        return result.url;
      } else {
        console.error('이미지 업로드 실패');
        return null;
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = profileImage;
      if (file) {
        imageUrl = await handleImageUpload();
      }

      const response = await fetch('/profile/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          uName,
          uType,
          profileImage: imageUrl,
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Profile updated successfully:', result.user);
        alert('프로필이 업데이트 되었습니다.');
        navigate('/Mypage');
      } else {
        console.error('Profile update failed');
        alert('프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getBorderColor = (level) => {
    switch (level) {
      case '빨강':
        return 'red';
      case '주황':
        return 'orange';
      case '노랑':
        return 'yellow';
      case '초록':
        return 'green';
      case '파랑':
        return 'blue';
      case '보라':
        return 'purple';
      default:
        return 'black';
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
              src={preview || userData.profileImage || '/default-profile.png'}
              className="mpm_profile_image"
              style={{
                borderColor: getBorderColor(userData.uLevel),
              }}
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
              팀 프로젝트 유형
              <div className="team_type_radio">
                {typecategoryOptions.map((category) => (
                  <label key={category} className="radio-label">
                    <input
                      type="radio"
                      name="uType"
                      value={category}
                      checked={uType === category}
                      onChange={handleTypeChange}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </label>
          </div>

          <div className="profile_nickname_edit">
            프로필 사진
            <input
              type="file"
              className="file-edit"
              onChange={handleFileChange}
            />
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

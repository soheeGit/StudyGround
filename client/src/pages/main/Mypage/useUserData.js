import { useState, useEffect } from 'react';

const useUserData = () => {
  const [userData, setUserData] = useState({
    uId: '',
    uName: '',
    uType: '',
    uLevel: '',
    profileImage: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/profile/myUserData', {
          method: 'GET',
          credentials: 'include',
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setUserData({
            uId: result.user.uId,
            uName: result.user.uName,
            uType: result.user.uType,
            uLevel: result.user.uLevel,
            profileImage: result.user.profileImage,
          });
        } else {
          alert(result.message || '사용자 정보 불러오기 오류');
        }
      } catch (error) {
        alert('사용자 정보 불러오기 오류: ' + error.message);
      }
    };

    fetchUserData();
  }, []);

  return userData;
};

export default useUserData;

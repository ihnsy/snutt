import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 사용

type UserData = {
  nickname: {
    nickname: string;
    tag: string;
  };
};

const MyPage: React.FC = () => {
  const [nickname, setNickname] = useState<string>(''); // 닉네임을 빈 문자열로 초기화
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // localStorage에서 token 가져오기

      if (token !== null && token !== '') { // token이 null이나 빈 문자열이 아닌 경우
        try {
          const userResponse = await fetch(
            'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/users/me',
            {
              method: 'GET',
              headers: {
                'x-access-token': token, // 저장된 token을 사용
              },
            },
          );

          if (userResponse.ok) {
            const userData: UserData = (await userResponse.json()) as UserData;
            setNickname(`${userData.nickname.nickname}#${userData.nickname.tag}`); // 닉네임 설정
          } else {
            console.error('사용자 정보를 가져오는 데 실패했습니다.');
          }
        } catch (error) {
          console.error('오류 발생:', error);
        }
      } else {
        // 토큰이 없으면 로그인 화면으로 이동
        console.error('로그인 토큰이 없습니다.');
        navigate('/login');
      }
    };

    void fetchUserData(); // 비동기 함수 호출 시 void로 처리하여 경고 무시
  }, [navigate]);

  const goToTimeTable = () => {
    navigate('/timetable'); // 시간표 페이지로 이동
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로그아웃 시 토큰 삭제
    navigate('/login'); // 로그인 화면으로 이동
  };

  return (
    <div>
      <h1>마이페이지</h1>
      {/* 닉네임 표시 */}
      <p>닉네임: {nickname}</p>

      {/* 시간표로 이동하는 버튼 */}
      <button onClick={goToTimeTable}>
        시간표 보기
      </button>

      {/* 로그아웃 버튼 */}
      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
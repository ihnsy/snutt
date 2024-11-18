import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Navbar } from '@/app/Navbar';

import styles from './MyPage.module.css';

type UserData = {
  nickname: {
    nickname: string;
    tag: string;
  };
};

const MyPage: React.FC = () => {
  const [nickname, setNickname] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (token !== null && token !== '') {
        try {
          const userResponse = await fetch(
            'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/users/me',
            {
              method: 'GET',
              headers: {
                'x-access-token': token,
              },
            },
          );

          if (userResponse.ok) {
            const userData = (await userResponse.json()) as UserData;
            setNickname(
              `${userData.nickname.nickname}#${userData.nickname.tag}`,
            );
          } else {
            console.error('사용자 정보를 가져오는 데 실패했습니다.');
          }
        } catch (error) {
          console.error('오류 발생:', error);
        }
      } else {
        console.error('로그인 토큰이 없습니다.');
        navigate('/login');
      }
    };

    void fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.mypageContainer}>
      <div>
        <h1 className={styles.title}>마이페이지</h1>

        <div className={classNames(styles.section, styles.accountSection)}>
          <p className={styles.sectionTitle}>내 계정</p>
          <p className={styles.accountInfo}>{nickname ?? '닉네임 없음'}</p>
        </div>

        <div className={styles.section}>
          <div className={styles.menuItem}>
            색상모드 <span className={styles.menuRight}>라이트모드</span>
          </div>
          <div className={styles.menuItem}>시간표 설정</div>
          <div className={styles.menuItem}>시간표 테마</div>
        </div>

        <div className={styles.section}>
          <div className={styles.menuItem}>빈자리 알림</div>
        </div>

        <div className={styles.section}>
          <div className={styles.menuItem}>버전 정보</div>
          <div className={styles.menuItem}>개발자 정보</div>
        </div>

        <button className={styles.logoutButton} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
      <Navbar />
    </div>
  );
};

export default MyPage;

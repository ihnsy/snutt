import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import more from '@/../assets/tab_more_off.svg';
import people1 from '@/../assets/tab_people_off_1.svg';
import people2 from '@/../assets/tab_people_off_2.svg';
import people3 from '@/../assets/tab_people_off_3.svg';
import people4 from '@/../assets/tab_people_off_4.svg';
import search from '@/../assets/tab_search_off.svg';
import thumb from '@/../assets/tab_thumb_off.svg';
import timetable from '@/../assets/tab_timetable.svg';

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

  const goToTimeTable = () => {
    navigate('/timetable');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.mypageContainer}>
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

      <div className="flex border-t-[1px] border-t-[#C4C4C4] w-[375px] h-[50px] py-[10px] px-[30px] justify-between absolute bottom-0">
        <img src={timetable} className="w-7.5 h-7.5" onClick={goToTimeTable} />
        <img src={search} className="w-7.5 h-7.5" />
        <img src={thumb} className="w-7.5 h-7.5" />
        <div className="relative w-[30px] h-[30px]">
          <img src={people1} className="absolute left-1.5 top-1" />
          <img src={people2} className="absolute left-0.5 top-4" />
          <img src={people3} className="absolute left-5 top-4" />
          <img src={people4} className="absolute left-[17px] top-[4px]" />
        </div>
        <img src={more} className="w-[30px] h-[30px]" />
      </div>
    </div>
  );
};

export default MyPage;

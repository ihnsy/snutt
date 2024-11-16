import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { LectureList } from '@/app/LectureTypes';

const Timetablelist: React.FC = () => {
  const navigate = useNavigate();
  const [LectureList, setLectureList] = useState<LectureList | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null || token.trim() === '') {
      navigate('/home'); // 토큰이 없으면 홈 페이지로 리다이렉트
    } else {
      void bringTimetablelist(); // 토큰이 있으면 시간표 정보 가져오기
    }
  }, [navigate]);

  const goToTimeTable = () => {
    navigate('/'); // 뒤로가기
  };

  const bringTimetablelist = async (): Promise<void> => {
    const token = localStorage.getItem('token') as string;

    try {
      const userResponse = await fetch(
        'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/recent',
        {
          method: 'GET',
          headers: { 'x-access-token': token },
        },
      );

      if (!userResponse.ok) {
        throw new Error(
          `Failed to fetch user data: ${userResponse.statusText}`,
        );
      }

      const userData: LectureList = (await userResponse.json()) as LectureList;
      setLectureList(userData); // 데이터 받아와서 상태 업데이트
      console.debug(userData); // 받아온 데이터를 콘솔에 출력
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    void bringTimetablelist();
  }, []); // 최초 한 번만 실행

  console.debug(LectureList); // LectureList 콘솔에 출력 (디버깅 용도)

  return(
    <div>
      <button onClick={goToTimeTable}>뒤로</button>
      {/* LectureList가 null이 아니고 lecture_list가 있을 때만 렌더링 */}
      {LectureList !== null && LectureList.lecture_list.map((lecture, index) => (
        <div key={index}>
          <p>{lecture.course_title}</p>
        </div>
      ))}
    </div>
  );
}

export default Timetablelist;

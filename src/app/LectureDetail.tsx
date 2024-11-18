import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import back from '@/../assets/back_icon.svg';
import type { LectureList } from '@/app/LectureTypes';

const LectureDetail: React.FC = () => {
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

  const goToTimetablelist = () => {
    navigate('/timetables/:id/lectures');
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
          Failed to fetch user data: ${userResponse.statusText},
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

  return (
    <div className="flex flex-col h-[100dvh] bg-white">
      {/* 상단 네비게이션 */}
      <div className="flex border-b-[1px] border-b-[#C8C8C8] h-[50px] py-[10px] px-[5px] items-center">
        <div className="flex flex-row items-center cursor-pointer" onClick={goToTimetablelist}>
          <img src={back} className="w-[30px] h-[30px]" />
          <p>강의 상세 보기</p>
        </div>
      </div>

      {/* 강의 상세 정보 */}
      <div className="flex flex-col p-5 gap-4">
        <div>
          <h1 className="text-lg font-bold">{lecture.course_title}</h1>
          <p className="text-sm text-gray-600">교수: {lecture.instructor}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm">색상:</p>
            <div
              className="w-5 h-5 border"
              style={{ backgroundColor: lecture.color?.bg || '#ffffff' }}
            ></div>
          </div>
        </div>

        {/* 강의 세부 정보 */}
        <div className="border-t pt-4">
          <p className="text-sm">학과: {lecture.department || '미정'}</p>
          <p className="text-sm">학년: {lecture.academic_year}</p>
          <p className="text-sm">학점: {lecture.credit}</p>
          <p className="text-sm">분류: {lecture.classification}</p>
          <p className="text-sm">강좌번호: {lecture.course_number}</p>
          <p className="text-sm">분반번호: {lecture.lecture_number}</p>
          <p className="text-sm">정원: {lecture.quota}</p>
          <p className="text-sm">비고: {lecture.remark || '(없음)'}</p>
        </div>

        {/* 시간 및 장소 */}
        <div className="border-t pt-4">
          <h2 className="text-md font-bold">시간 및 장소</h2>
          {lecture.class_time_json.map((time, index) => (
            <div key={index} className="text-sm">
              시간: {time.day}요일 {time.start_time} ~ {time.end_time}
              <br />
              장소: {time.place || '미정'}
            </div>
          ))}
        </div>

        {/* 삭제 버튼 */}
        <div className="mt-6">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => { alert('강의 삭제 기능은 별도로 구현 필요'); }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureDetail;
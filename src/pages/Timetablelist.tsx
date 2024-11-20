import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import back from '@/../assets/back_icon.svg';
import { Navbar } from '@/components/Navbar';
import type { LectureList } from '@/types/LectureTypes';

const Timetablelist: React.FC = () => {
  const navigate = useNavigate();
  const [LectureList, setLectureList] = useState<LectureList | null>(null);
  const dayMapping = ['M', 'T', 'W', 'T', 'F', 'S'];

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

  const goToLectureDetail = (lectureId: string) => {
    if (
      LectureList !== null &&
      typeof LectureList._id === 'string' &&
      LectureList._id.trim() !== ''
    ) {
      navigate(`/timetables/${LectureList._id}/lectures/${lectureId}`);
    } else {
      console.error('LectureList or _id is invalid');
    }
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

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex border-b-[1px] border-b-[#C8C8C8] h-[50px] py-[10px] px-[5px] justify-between">
        <div
          className="flex flex-row items-center gap-[0px] cursor-pointer"
          onClick={goToTimeTable}
        >
          <img src={back} className="w-[30px] h-[30px]" />
          <div className="w-auto h-auto items-center justify-center">
            <p>뒤로</p>
          </div>
        </div>
      </div>
      <div className="1fr">
        {LectureList !== null &&
          LectureList.lecture_list.map((lecture, index) => (
            <div
              key={index}
              className="flex flex-col py-[5px] px-[8px] border-b-[1px] border-b-[#C4C4C4] cursor-pointer"
              onClick={() => {
                goToLectureDetail(lecture._id);
              }} // 클릭 시 이동
            >
              <div className="flex flex-row justify-between">
                <p className="text-sm font-bold">{lecture.course_title}</p>
                <p className="text-xs">
                  {lecture.instructor} &#47; {lecture.credit}학점
                </p>
              </div>
              <div className="flex flex-row items-center">
                {lecture.class_time_json.map((_, i) => (
                  <React.Fragment key={i}>
                    <p className="text-xs">
                      {typeof lecture.class_time_json[i]?.day === 'number'
                        ? dayMapping[lecture.class_time_json[i].day]
                        : '-'}{' '}
                      ({lecture.class_time_json[i]?.start_time}~
                      {lecture.class_time_json[i]?.end_time})
                    </p>
                    {i < lecture.class_time_json.length - 1 && (
                      <span>,&nbsp;</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex flex-row items-center">
                {lecture.class_time_json.map((_, i) => (
                  <React.Fragment key={i}>
                    <p className="text-xs">
                      {lecture.class_time_json[i]?.place?.trim() !== ''
                        ? lecture.class_time_json[i]?.place
                        : '-'}
                    </p>
                    {i < lecture.class_time_json.length - 1 && (
                      <span>,&nbsp;</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
      </div>
      <Navbar />
    </div>
  );
};

export default Timetablelist;

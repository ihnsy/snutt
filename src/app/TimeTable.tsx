import { Slot } from '@radix-ui/react-slot';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import list from '@/../assets/header_list.svg';
import { Navbar } from '@/app/Navbar';

import type { LectureList } from './LectureTypes';

const DAYS_OF_WEEK = ['월', '화', '수', '목', '금'] as const;
const START_OF_DAY = 9;
const END_OF_DAY = 22;
const NUM_HOURS = END_OF_DAY - START_OF_DAY + 1;
const HOURS = Array.from({ length: NUM_HOURS }, (_, i) => START_OF_DAY + i);

const TimeTable: React.FC = () => {
  const navigate = useNavigate();
  const [LectureList, setLectureList] = useState<LectureList | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === null || token.trim() === '') {
      navigate('/home'); // 토큰이 없으면 홈 페이지로 리다이렉트
    } else {
      void bringTimetable(); // 토큰이 있으면 시간표 정보 가져오기
    }
  }, [navigate]);

  const bringTimetable = async (): Promise<void> => {
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
      setLectureList(userData);
      console.debug(userData); // 데이터를 state에 저장
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    void bringTimetable();
  }, []);

  const goToTimetablelist = () => {
    if (LectureList !== null) {
      const id = LectureList._id; // LectureList의 _id를 가져옴
      navigate(`/timetables/${id}/lectures`);
    } else {
      console.error('LectureList is null. Cannot navigate.');
    }
  };

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex h-10 py-[8px] px-[16px] border-b-[1px] border-b-[#C4C4C4] items-center gap-[10px]">
        <img
          src={list}
          className="w-[18px] h-[18px] mr-[5px] cursor-pointer"
          onClick={goToTimetablelist}
        />
        <h1 className="w-[25px] h-[24px] text-base content-center">a안</h1>
        <p className="w-[45px] h-[16px] text-xs text-[#C4C4C4]">(18학점)</p>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="grid w-full h-[30px] grid-cols-[5%_19%_19%_19%_19%_19%] divide-x divide-[#C4C4C4] border-y border-y-[#C4C4C4]">
          <div></div>
          {/* 빈자리 */}
          {DAYS_OF_WEEK.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-xs text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid flex-grow grid-cols-[5%_19%_19%_19%_19%_19%] divide-x divide-[#C4C4C4]">
          <div className="flex flex-col">
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="flex flex-grow justify-center border-b border-b-[#C4C4C4] text-xs text-muted-foreground"
              >
                {hour}
              </div>
            ))}
          </div>
          {/* Schedule Cells by Day */}
          {DAYS_OF_WEEK.map((_, dayIndex) => (
            <div key={dayIndex} className="relative flex flex-col">
              {HOURS.map((_, hourIndex) => (
                <div
                  key={hourIndex}
                  className="relative flex-grow border-b border-b-[#C4C4C4]"
                >
                  {/* Horizontal Divider */}
                  <div className="absolute inset-x-0 top-1/2 border-t border-t-[#C4C4C4]" />
                </div>
              ))}
              {/* Add Lectures for the Day */}
              {LectureList !== null &&
                LectureList.lecture_list.map((lecture, lectureIndex) =>
                  lecture.class_time_json
                    .filter((classTime) => classTime.day === dayIndex)
                    .map((classTime, classTimeIndex) => {
                      const startHourPosition =
                        classTime.startMinute / 60 - START_OF_DAY;
                      const endHourPosition =
                        classTime.endMinute / 60 - START_OF_DAY;
                      const duration = endHourPosition - startHourPosition;

                      return (
                        <Slot key={`${lectureIndex}-${classTimeIndex}`}>
                          <div
                            className="absolute inset-x-0 flex flex-col justify-center p-2 text-center text-xs font-bold border text-white bg-black"
                            style={{
                              top: `${(startHourPosition * 100) / NUM_HOURS}%`,
                              height: `${(duration * 100) / NUM_HOURS}%`,
                            }}
                          >
                            <p>{lecture.course_title}</p>
                            <p>{classTime.place}</p>
                          </div>
                        </Slot>
                      );
                    }),
                )}
            </div>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default TimeTable;

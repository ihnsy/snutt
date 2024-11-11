import { Slot } from '@radix-ui/react-slot';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import search from '@/../assets//tab_search_off.svg';
import list from '@/../assets/header_list.svg';
import more from '@/../assets/tab_more_off.svg';
import people1 from '@/../assets/tab_people_off_1.svg';
import people2 from '@/../assets/tab_people_off_2.svg';
import people3 from '@/../assets/tab_people_off_3.svg';
import people4 from '@/../assets/tab_people_off_4.svg';
import thumb from '@/../assets/tab_thumb_off.svg';
import timetable from '@/../assets/tab_timetable.svg';
import {useAuth} from '@/app/App'

import type { LectureList } from './LectureTypes';

const DAYS_OF_WEEK = ['월', '화', '수', '목', '금'] as const;
const START_OF_DAY = 9;
const END_OF_DAY = 22;
const NUM_HOURS = END_OF_DAY - START_OF_DAY + 1;
const HOURS = Array.from({ length: NUM_HOURS }, (_, i) => START_OF_DAY + i);

const TimeTable: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [LectureList, setLectureList] = useState<LectureList | null>(null);

  const goToMyPage = () => {
    navigate('/mypage'); // 마이페이지로 이동
  };
  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const bringTimetable = async (): Promise<void> => {

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

  console.debug(LectureList);

  return (
    <div className="flex flex-col h-screen border max-w-[375px] mx-auto w-full">
      <div className="flex w-[375px] h-[64px] py-[8px] px-[16px] border-b-[1px] border-b-[#C4C4C4] items-center gap-[10px]">
        <img src={list} className="w-[18px] h-[18px] mr-[5px]" />
        <h1 className="w-[25px] h-[24px] text-base content-center">a안</h1>
        <p className="w-[45px] h-[16px] text-xs text-[#C4C4C4]">(18학점)</p>
      </div>
      <div className="flex w-[375px] h-[800px] flex-col">
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
      <div className="flex border-t-[1px] border-t-[#C4C4C4] w-[375px] h-[50px] py-[10px] px-[30px] justify-between">
        <img src={timetable} className="w-7.5 h-7.5" />
        <img src={search} className="w-7.5 h-7.5" />
        <img src={thumb} className="w-7.5 h-7.5" />
        <div className="relative w-[30px] h-[30px]">
          <img src={people1} className="absolute left-1.5 top-1" />
          <img src={people2} className="absolute left-0.5 top-4" />
          <img src={people3} className="absolute left-5 top-4" />
          <img src={people4} className="absolute left-[17px] top-[4px]" />
        </div>
        <img
          src={more}
          className="w-[30px] h-[30px] cursor-pointer"
          onClick={goToMyPage}
        />
      </div>
    </div>
  );
};

export default TimeTable;

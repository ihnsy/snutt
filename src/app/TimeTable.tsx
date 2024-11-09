import React, {useEffect, useState} from 'react';
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

import type { LectureList } from './LectureTypes';

const TimeTable: React.FC = () => {
  const navigate = useNavigate();
  const [LectureList, setLectureList] = useState<LectureList | null>(null);

  const goToMyPage = () => {
    navigate('/mypage'); // 마이페이지로 이동
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token') as string;

      try {
        const userResponse = await fetch(
          'https://snutt-api-dev.wafflestudio.com/v1/tables/recent',
          {
            method: 'GET',
            headers: { 'x-access-token': token },
          }
        );

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json() as LectureList;
        setLectureList(userData);
        console.debug(userData) // 데이터를 state에 저장
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData().catch((error: unknown) => {
      console.error('Error in fetchData execution:', error); // .catch로 에러 처리 추가
    });
  }, []);


  return (
    <div className="flex flex-col h-screen border max-w-[375px] mx-auto w-full">
      <div className="flex w-[375px] h-[64px] py-[8px] px-[16px] border-b-[1px] border-b-[#C4C4C4] items-center gap-[10px]">
        <img src={list} className="w-[18px] h-[18px] mr-[5px]" />
        <h1 className="w-[25px] h-[24px] text-base content-center">a안</h1>
        <p className="w-[45px] h-[16px] text-xs text-[#C4C4C4]">(18학점)</p>
      </div>
      <div className="flex w-[375px] h-[800px]">
        <h1>그리드</h1>
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
        <img src={more} className="w-[30px] h-[30px] cursor-pointer" onClick={goToMyPage} />
      </div>
    </div>
  );
};

export default TimeTable;

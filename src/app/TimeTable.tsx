import React from 'react';
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

const TimeTable: React.FC = () => {
  const navigate = useNavigate();

  const goToMyPage = () => {
    navigate('/mypage'); // 마이페이지로 이동
  };

  return (
    <div className="flex flex-col h-screen border max-w-[375px] mx-auto w-full">
      <div className="flex w-[375px] h-[64px] p-2 border-b-[1px] border-b-[#C4C4C4]">
        <img src={list} className="w-17 h-17" />
      </div>
      <div className="flex w-[375px] h-[800px]">
        <h1>그리드</h1>
      </div>
      <div className="flex w-[375px] h-[50px]">
        <img src={timetable} className="w-7.5 h-7.5" />
        <img src={search} className="w-7.5 h-7.5" />
        <img src={thumb} className="w-7.5 h-7.5" />
        <div className="w-7.5 h-7.5">
          <img src={people1} className="absolute left-1.5 top-1" />
          <img src={people2} className="absolute left-0.5 top-4" />
          <img src={people3} className="absolute left-5 top-4" />
          <img src={people4} className="absolute left-4.125 top-1.25" />
        </div>
        <img src={more} className="w-7.5 h-7.5" onClick={goToMyPage} />
      </div>
    </div>
  );
};

export default TimeTable;

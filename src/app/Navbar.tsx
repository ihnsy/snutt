import { useNavigate } from 'react-router-dom';

import search from '@/../assets//tab_search_off.svg';
import more from '@/../assets/tab_more_off.svg';
import people1 from '@/../assets/tab_people_off_1.svg';
import people2 from '@/../assets/tab_people_off_2.svg';
import people3 from '@/../assets/tab_people_off_3.svg';
import people4 from '@/../assets/tab_people_off_4.svg';
import thumb from '@/../assets/tab_thumb_off.svg';
import timetable from '@/../assets/tab_timetable.svg';

export const Navbar = () => {
  const navigate = useNavigate();

  const goToMyPage = () => {
    navigate('/mypage');
  };

  const goToTimetable = () => {
    navigate('/');
  };
  return (
    <div className="flex border-t-[1px] border-t-[#C4C4C4] h-[50px] py-[10px] px-[30px] justify-between mt-auto">
      <img
        src={timetable}
        className="w-7.5 h-7.5 cursor-pointer"
        onClick={goToTimetable}
      />
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
  );
};

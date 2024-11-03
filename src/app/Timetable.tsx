import '@/app/tailwind.css';
import styles from '@/app/Timetable.module.css'
import { useNavigation } from '@/app/useNavigate';

import list from '@/../assets/header_list.svg'
import timetable from '@/../assets/tab_timetable.svg'
import search from '@/../assets//tab_search_off.svg'
import thumb from '@/../assets/tab_thumb_off.svg'
import people1 from '@/../assets/tab_people_off_1.svg'
import people2 from '@/../assets/tab_people_off_2.svg'
import people3 from '@/../assets/tab_people_off_3.svg'
import people4 from '@/../assets/tab_people_off_4.svg'
import more from '@/../assets/tab_more_off.svg'

export const Timetable = () => {
  const getTimetable = async () => {
    const data = await fetch('https://snutt-api-dev.wafflestudio.com/v1/tables/recent')
    .then((response) => response.json());
    return data
  }
  const {data} = useQuery(['timetable'], getTimetable, {enabled: !!id})

  type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
  type Hour24 =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23;
    
  const DAY_LABEL_MAP = {
    0: '월',
    1: '화',
    2: '수',
    3: '목',
    4: '금',
    5: '토',
    6: '일',
  };
  const dayList: Day[] = [0, 1, 2, 3, 4, 5, 6];
  const hourList: Hour24[] = Array.from(
    { length: 14 },
    (_, i) => (9 + i) as Hour24,
  );

  return (
    <>
    <div className="h-full bg-white flex flex-col items-center justify-center">
      <div className={styles.header} "w-full h-40/752" >
        <img src={list} className="w-17 h-17" />
      </div>
      <div className="w-full h-628/752" className={styles.timetable}>
        
      </div>
      <div className="w-full h-84/752" {styles.tab}>
        <img src={timetable} className="w-7.5 h-7.5" />
        <img src={search} className="w-7.5 h-7.5" />
        <img src={thumb} className="w-7.5 h-7.5" />
        <div className="w-7.5 h-7.5 relative">
          <img src={people1} className="absolute left-1.5 top-1" />
          <img src={people2} className="absolute left-0.5 top-4" />
          <img src={people3} className="absolute left-5 top-4" />
          <img src={people4} className="absolute left-4.125 top-1.25" />
        </div>
        <img src={more} className="w-7.5 h-7.5" />
      </div>
    </div>
    </>
  );
};

import '@/app/tailwind.css';

import { useState } from 'react';

import search from '@/../assets//tab_search_off.svg';
import list from '@/../assets/header_list.svg';
import more from '@/../assets/tab_more_off.svg';
import people1 from '@/../assets/tab_people_off_1.svg';
import people2 from '@/../assets/tab_people_off_2.svg';
import people3 from '@/../assets/tab_people_off_3.svg';
import people4 from '@/../assets/tab_people_off_4.svg';
import thumb from '@/../assets/tab_thumb_off.svg';
import timetable from '@/../assets/tab_timetable.svg';
import { useNavigation } from '@/app/useNavigate';

export const Timetable = async () => {
  const { goMypage } = useNavigation();

  type LectureTime = {
    day: string;
    place: string;
    startMinute: number;
    endMinute: number;
  };

  type Lecture = {
    _id: string;
    academic_year: string;
    category: string;
    class_time_json: LectureTime[];
  };
  // GET /v1/tables/recent 응답의 타입이 너무 긴데, 다른 파일을 만들어서 type 을 지정해주고 불러오는 편이 좋을지 여쭙니다.

  const [lectureList, setLectureList] = useState<Lecture[]>([]);

  const token = localStorage.getItem('token');

  if (token !== '') {
    const userResponse = await fetch(
      'https://snutt-api-dev.wafflestudio.com/v1/tables/recent',
      {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      },
    );

    const userData = await userResponse.json();
    const lectures = userData.lecture_list.map((lecture) => ({
      _id: lecture._id,
      academic_year: lecture.academic_year,
      category: lecture.category,
      class_time_json: lecture.class_time_json.map((time) => ({
        day: time.day,
        place: time.place,
        startMinute: time.startMinute,
        endMinute: time.endMinute,
      })),
    }));
    setLectureList(lectures);

    if (lectureList) {
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

      const columnCount = dayList.length - 2;
      const rowCount = hourList.length * 12;

      return (
        <>
          <div className="flex flex-col overflow-hidden h-screen items-center max-w-[375px] mx-auto w-full">
            <div className="flex w-full basis-[5.32%] p-2 border-b-[1px] border-b-[#C4C4C4] justify-between">
              <img src={list} className="w-17 h-17" />
            </div>
            <div className="flex w-full h-basis-[83.51%]">
              <div
                className="grid h-full"
                style={{
                  gridTemplateColumns: `16px repeat(${columnCount}, 1fr)`,
                  gridTemplateRows: `40px repeat(${rowCount}, 1fr)`,
                }}
              >
                {/* 날 Header */}
                {dayList.slice(0, 5).map((day, i) => (
                  <div
                    key={day}
                    className="row-start-1 row-end-2 flex justify-center items-end p-2 text-xs text-textAlternative"
                    style={{
                      gridColumnStart: i + 2,
                      gridColumnEnd: i + 2 + 1,
                    }}
                  >
                    {DAY_LABEL_MAP[day]}
                  </div>
                ))}
                {/* 시간 col */}
                {hourList.map((hour, i) => (
                  <div
                    key={hour}
                    className="col-start-1 col-end-2 text-right text-xs text-textALternative opacity-40 pr-1 pt-1"
                    style={{
                      gridRowStart: i * 12 + 2,
                      gridRowEnd: i * 12 + 2 + 6,
                    }}
                  >
                    {hour}
                  </div>
                ))}
                {/* 시간 라인 진한거 */}
                {hourList.map((_, i) => (
                  <div
                    key={_}
                    className="col-start-1 -col-end-1 border-t-[1px] border-solid  border-t-lineLight"
                    style={{
                      gridRowStart: i * 12 + 2,
                      gridRowEnd: i * 12 + 2 + 6,
                    }}
                  ></div>
                ))}
                {/* 시간 라인 연한거 */}
                {hourList.map((_, i) => (
                  <div
                    key={_}
                    className="col-start-2 -col-end-1 border-b-[1px] border-solid  border-b-lineLightest"
                    style={{
                      gridRowStart: i * 12 + 2,
                      gridRowEnd: i * 12 + 2 + 6,
                    }}
                  ></div>
                ))}
                {/* 날짜 라인 */}
                {dayList.slice(0, 5).map((_, i) => (
                  <div
                    key={_}
                    className="row-start-1 -row-end-1 border-l-[1px] border-solid border-l-lineLight"
                    style={{
                      gridColumnStart: i + 2,
                      gridColumnEnd: i + 2 + 1,
                    }}
                  ></div>
                ))}
                {/* 강의 item */}
                {lectureList.map((lecture) =>
                  lecture.class_time_json.map((time, i) => {
                    //colStart, colEnd, rowStart, rowEnd 불러오는 법을 모르겠습니다

                    return (
                      <div
                        key={`${lecture._id}-${i}`}
                        className={`text-white flex flex-col items-center justify-center p-2 text-center bg-black col-start-${colStart} col-end-${colEnd} row-start-${rowStart} row-end-${rowEnd}`}
                        style={{
                          gridColumnStart: colStart,
                          gridColumnEnd: colEnd,
                          gridRowStart: rowStart,
                          gridRowEnd: rowEnd,
                        }}
                      >
                        <span className="text-[10px] font-normal">
                          {lecture.course_title}
                        </span>
                        <span className="text-[10px] font-bold">
                          {time.place}
                        </span>
                      </div>
                    );
                  }),
                )}
              </div>
            </div>
            <div className="flex w-full h-basis-[11.17%]">
              <img src={timetable} className="w-7.5 h-7.5" />
              <img src={search} className="w-7.5 h-7.5" />
              <img src={thumb} className="w-7.5 h-7.5" />
              <div className="w-7.5 h-7.5">
                <img src={people1} className="absolute left-1.5 top-1" />
                <img src={people2} className="absolute left-0.5 top-4" />
                <img src={people3} className="absolute left-5 top-4" />
                <img src={people4} className="absolute left-4.125 top-1.25" />
              </div>
              <img src={more} className="w-7.5 h-7.5" onClick={goMypage} />
            </div>
          </div>
        </>
      );
    }
  }
};

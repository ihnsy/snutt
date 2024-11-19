import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { LectureList } from '@/types/LectureTypes';

const LectureDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id, lectureId } = useParams<{ id?: string; lectureId?: string }>();
  const [lecture, setLecture] = useState<
    LectureList['lecture_list'][number] | null
  >(null);

  useEffect(() => {
    const fetchLectureDetail = async (): Promise<void> => {
      if (id == null || lectureId == null) {
        console.error('Invalid id or lectureId');
        alert('유효하지 않은 ID입니다.');
        navigate('/timetables');
        return;
      }

      const token = localStorage.getItem('token');
      if (token == null || token.trim() === '') {
        console.error('Token is missing');
        alert('인증 토큰이 없습니다.');
        navigate('/home');
        return;
      }

      try {
        const response = await fetch(
          `https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/${id}`,
          {
            method: 'GET',
            headers: { 'x-access-token': token },
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch lecture detail: ${response.statusText}`,
          );
        }

        const data = (await response.json()) as LectureList;
        const foundLecture =
          data.lecture_list.find((lec) => lec._id === lectureId) ?? null;

        if (foundLecture === null) {
          console.error('Lecture not found in lecture list');
          alert('강의를 찾을 수 없습니다.');
          navigate(`/timetables/${id}/lectures`);
          return;
        }

        setLecture(foundLecture);
      } catch (error: unknown) {
        console.error('Error fetching lecture detail:', error);
        alert('강의 정보를 가져오지 못했습니다.');
        navigate('/timetables');
      }
    };

    fetchLectureDetail().catch((err: unknown) => {
      console.error('Unhandled error in fetchLectureDetail:', err);
    });
  }, [id, lectureId, navigate]);

  const handleDelete = async () => {
    if (id == null || lectureId == null) {
      alert('유효하지 않은 ID입니다.');
      return;
    }

    const token = localStorage.getItem('token');
    if (token == null || token.trim() === '') {
      alert('인증 토큰이 없습니다.');
      navigate('/home');
      return;
    }

    try {
      const response = await fetch(
        `https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/${id}/lectures/${lectureId}`,
        {
          method: 'DELETE',
          headers: { 'x-access-token': token },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to delete lecture: ${response.statusText}`);
      }

      alert('강의가 삭제되었습니다.');
      navigate(`/timetables/${id}/lectures`);
    } catch (error) {
      console.error('Error deleting lecture:', error);
      alert('강의를 삭제하지 못했습니다.');
    }
  };

  if (lecture === null) {
    return <div>Loading...</div>;
  }

  const courseTitle =
    typeof lecture.course_title === 'string' &&
    lecture.course_title.trim() !== ''
      ? lecture.course_title.trim()
      : '강의 제목 없음';

  const instructor =
    typeof lecture.instructor === 'string' && lecture.instructor.trim() !== ''
      ? lecture.instructor.trim()
      : '정보 없음';

  const credit =
    typeof lecture.credit === 'number' &&
    !isNaN(lecture.credit) &&
    lecture.credit > 0
      ? lecture.credit
      : '정보 없음';

  return (
    <div className="h-[100dvh] flex flex-col items-center p-6 w-full">
      {/* 상단 네비게이션 */}
      <div className="basis-[1] flex-grow-0 flex-shrink-0 flex justify-between items-center border-b pb-2 w-full">
        <button
          onClick={() => {
            if (typeof id === 'string') {
              navigate(`/timetables/${id}/lectures`);
          }}}
          className="text-blue-500 text-lg"
        >
          ← 돌아가기
        </button>
      </div>

      {/* 강의 제목 */}
      <div className="basis-[1] flex-grow-0 flex-shrink-0 text-center">
        <h1 className="text-xl font-bold my-2">{courseTitle}</h1>
        <p className="text-lg text-gray-600">교수: {instructor}</p>
      </div>

      {/* 상세 정보 */}
      <div className="basis-[4] flex-grow-0 flex-shrink-0 text-center space-y-2 mb-6">
        <p>
          학과:{' '}
          {typeof lecture.department === 'string' &&
          lecture.department.trim() !== ''
            ? lecture.department
            : '정보 없음'}
        </p>
        <p>
          학점:{' '}
          {typeof credit === 'number' && !isNaN(credit) && credit > 0
            ? credit
            : '정보 없음'}
        </p>
        <p>
          분류:{' '}
          {typeof lecture.category === 'string' &&
          lecture.category.trim() !== ''
            ? lecture.category
            : '정보 없음'}
        </p>
        <p>
          구분:{' '}
          {typeof lecture.remark === 'string' && lecture.remark.trim() !== ''
            ? lecture.remark
            : '(없음)'}
        </p>
        <p>
          강좌번호:{' '}
          {typeof lecture.course_number === 'string' &&
          lecture.course_number.trim() !== ''
            ? lecture.course_number
            : '정보 없음'}
        </p>
        <p>
          분반번호:{' '}
          {typeof lecture.lecture_number === 'string' &&
          lecture.lecture_number.trim() !== ''
            ? lecture.lecture_number
            : '정보 없음'}
        </p>
        <p>
          정원:{' '}
          {typeof lecture.quota === 'number' &&
          !isNaN(lecture.quota) &&
          lecture.quota > 0
            ? lecture.quota
            : '정보 없음'}
        </p>
      </div>

      {/* 시간 및 장소 */}
      <div className="basis-[3] flex-grow-0 flex-shrink-0 text-center border-t border-b py-4 mb-6">
        <h2 className="text-l font-bold mb-2">시간 및 장소</h2>
        {lecture.class_time_json.map((time, i) => {
          const timeDay =
            typeof time.day === 'number' ? `요일 ${time.day}` : '미정';
          const timeStart =
            typeof time.start_time === 'string' &&
            time.start_time.trim() !== ''
              ? time.start_time
              : '-';
          const timeEnd =
            typeof time.end_time === 'string' && time.end_time.trim() !== ''
              ? time.end_time
              : '-';
          const place =
            typeof time.place === 'string' && time.place.trim() !== ''
              ? time.place.trim()
              : '미정';

          return (
            <div key={i} className="mb-2">
              <p className="font-medium">
                {timeDay} {timeStart} ~ {timeEnd}
              </p>
              <p className="text-gray-600">장소: {place}</p>
            </div>
          );
        })}
      </div>

      <div className="basis-[1] flex-grow-0 flex-shrink-0 flex flex-col space-y-4 w-full">
        <button
          onClick={() => {
            void handleDelete();
          }}
          className="w-full py-3 text-red-500 font-bold"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default LectureDetail;

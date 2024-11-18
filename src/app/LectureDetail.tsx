import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { LectureList } from '@/app/LectureTypes';

const LectureDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id, lectureId } = useParams<{ id: string; lectureId: string }>();
  const [lecture, setLecture] = useState<LectureList['lecture_list'][0] | null>(null);

  useEffect(() => {
    if (id == null || id.trim() === '' || lectureId == null || lectureId.trim() === '') {
      console.error('Invalid parameters');
      return;
    }

    const fetchLectureDetail = async () => {
      try {
        const response = await fetch(
          `https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/${id}`,
          { method: 'GET' }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch lecture detail: ${response.statusText}`);
        }

        const data = (await response.json()) as LectureList;
        const foundLecture =
          lectureId.trim() !== ''
            ? data.lecture_list.find((lec) => lec._id === lectureId)
            : null;

        if (foundLecture != null) {
          setLecture(foundLecture);
        } else {
          setLecture(null);
        }
      } catch (error) {
        console.error('Error fetching lecture detail:', error);
      }
    };

    void fetchLectureDetail();
  }, [id, lectureId]);

  if (lecture == null) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1>{lecture.course_title}</h1>
      <p>Professor: {lecture.instructor}</p>
      <p>Credits: {lecture.credit}</p>
      {lecture.class_time_json.map((time, index) => (
        <div key={index}>
          <p>
            {time.day} {time.start_time} ~ {time.end_time}
          </p>
          <p>Place: {time.place.trim() !== '' ? time.place : '미정'}</p>
        </div>
      ))}
      <button
        onClick={() => {
          if (id != null && id.trim() !== '') {
            navigate(`/timetables/${id}/lectures`);
          } else {
            console.error('Invalid ID');
          }
        }}
      >
        Back
      </button>
    </div>
  );
};

export default LectureDetail;

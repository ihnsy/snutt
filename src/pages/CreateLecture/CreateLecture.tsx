import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Lecture } from '@/types/CreateLectureType';

const CreateLecture = () => {
  const { id } = useParams<{ id?: string }>();
  const [formData, setFormData] = useState({
    course_title: '',
    instructor: '',
    credit: 0,
    remark: '',
    place: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'credit' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    void (async () => {
      const lectureData: Lecture = {
        course_title: formData.course_title,
        instructor: formData.instructor,
        credit: formData.credit,
        remark: formData.remark,
        class_time_json: [
          {
            day: '2', // 고정
            place: formData.place,
            startMinute: 1140, // 고정
            endMinute: 1230, // 고정
            start_time: '19:00', // 고정
            end_time: '20:30', // 고정
            len: 1.5, // 고정
            start: 11, // 고정
          },
        ],
        color: [{ bg: 'white', fg: 'white' }], // 고정
        colorIndex: 0, // 고정
        is_forced: false, // 고정
      };

      try {
        const response = await fetch(`/v1/tables/${id ?? ''}/lecture`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lectureData),
        });

        if (response.ok) {
          alert('강의가 성공적으로 생성되었습니다!');
        } else {
          alert('강의 생성에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error creating lecture:', error);
        alert('강의 생성 중 오류가 발생했습니다.');
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        name="course_title"
        placeholder="강의 제목"
        value={formData.course_title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="instructor"
        placeholder="교수 이름"
        value={formData.instructor}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="credit"
        placeholder="학점"
        value={formData.credit}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="remark"
        placeholder="비고"
        value={formData.remark}
        onChange={handleChange}
      />
      <input
        type="text"
        name="place"
        placeholder="강의 장소"
        value={formData.place}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4">
        강의 생성
      </button>
    </form>
  );
};

export default CreateLecture;

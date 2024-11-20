type ClassTime = {
  day: string; // 요일 (0: 월요일, 1: 화요일, ...)
  place: string; // 강의 장소
  startMinute: number; // 강의 시작 분
  endMinute: number; // 강의 종료 분
  start_time: string; // 강의 시작 시간 (HH:mm 형식)
  end_time: string; // 강의 종료 시간 (HH:mm 형식)
  len: number; // 강의 길이 (분 단위)
  start: number; // 강의 시작 시각 (분 단위)
};

type LectureColor = {
  bg: string; // 배경색
  fg: string; // 글자색
};

export type Lecture = {
  course_title: string; // 강의 제목
  instructor: string; // 교수 이름
  credit: number; // 학점
  class_time_json: ClassTime[]; // 강의 시간 정보 배열
  remark: string; // 비고
  color: LectureColor[]; // 색상 정보
  colorIndex: number; // 색상 인덱스
  is_forced: boolean; // 강제 여부
};

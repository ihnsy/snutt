// LectureTypes.ts

// Define the LectureBuilding type
export type LectureRequest = { token: string }
export type LectureBuilding = {
  id: string;
  buildingNumber: string;
  buildingNameKor: string;
  buildingNameEng: string;
  locationInDMS: {
    latitude: number;
    longitude: number;
  };
  locationInDecimal: {
    latitude: number;
    longitude: number;
  };
  campus: string;
};

// Define the LectureTime type
export type LectureTime = {
  day: string;
  place: string;
  startMinute: number;
  endMinute: number;
  start_time: string;
  end_time: string;
  len: number;
  start: number;
  lectureBuildings: LectureBuilding[];
};

// Define the Lecture type
export type Lecture = {
  _id: string;
  academic_year: string;
  category: string;
  class_time_json: LectureTime[];
  classification: string;
  credit: number;
  department: string;
  instructor: string;
  lecture_number: string;
  quota: number;
  freshman_quota: number;
  remark: string;
  course_number: string;
  course_title: string;
  color: {
    bg: string;
    fg: string;
  };
  colorIndex: number;
  lecture_id: string;
  snuttEvLecture: {
    evLectureId: number;
  };
  class_time_mask: number[];
};

// Define the main LectureList type, which includes a list of lectures
export type LectureList = {
  _id: string;
  user_id: string;
  year: number;
  semester: string;
  lecture_list: Lecture[];
  title: string;
  theme: string;
  themeId: string;
  isPrimary: boolean;
  updated_at: string;
};

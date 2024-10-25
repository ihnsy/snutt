import React from 'react';
import { useNavigate } from 'react-router-dom';

const TimeTable: React.FC = () => {
  const navigate = useNavigate();

  const goToMyPage = () => {
    navigate('/mypage'); // 마이페이지로 이동
  };

  return (
    <div>
      <h1>시간표 페이지</h1>
      {/* 바텀 네비바에서 오른쪽 버튼 클릭 시 마이페이지로 이동 */}
      <button onClick={goToMyPage}>마이페이지로 이동</button>
    </div>
  );
};

export default TimeTable;

import '@/reset.css';
import '@/tailwind.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import image1 from '@/../assets/apple.png';
import image2 from '@/../assets/facebook.png';
import image3 from '@/../assets/google.png';
import image4 from '@/../assets/kakao.png';
import logo from '@/../assets/logo.svg';
import styles from '@/App.module.css';
import LectureDetail from '@/pages/LectureDetail/LectureDetail';
import Login from '@/pages/Login/Login';
import MyPage from '@/pages/MyPage/MyPage';
import TimeTable from '@/pages/TimeTable/TimeTable';
import Timetablelist from '@/pages/Timetablelist/Timetablelist';

export const App = () => {
  return (
    <Router>
      <div className={styles.wrapper}>
        <Routes>
          <Route path="/" element={<TimeTable />} />
          <Route path="timetables/:id/lectures" element={<Timetablelist />} />
          <Route
            path="timetables/:id/lectures/:lectureId"
            element={<LectureDetail />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <div className="flex-col flex items-center gap-4">
        <img src={logo} width="60" height="60" alt="logo" />
        <h1 className={styles.title}>TimeTable</h1>
      </div>
      <div className={styles.buttons}>
        <button className={styles.login} onClick={goLogin}>
          로그인
        </button>
        <button className={styles.signUp}>회원가입</button>
      </div>
      <div className="flex-col flex items-center gap-6 px-3 py-0">
        <div className={styles.barText}>
          <hr className={styles.bar} />
          <p className={styles.snsText}>SNS 계정으로 계속하기</p>
          <hr className={styles.bar} />
        </div>
        <div className="flex items-center gap-3">
          <img src={image4} className="w-11 h-11 rounded-full" alt="kakao" />
          <img src={image3} className="w-11 h-11 rounded-full" alt="google" />
          <img src={image2} className="w-11 h-11 rounded-full" alt="facebook" />
          <img src={image1} className="w-11 h-11 rounded-full" alt="apple" />
        </div>
      </div>
    </div>
  );
};

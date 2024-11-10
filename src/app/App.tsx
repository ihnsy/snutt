import '../reset.css';
import './tailwind.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import styles from './Landing.module.css';
import Login from './Login';
import MyPage from './MyPage';
import {Routeroot}  from './route';

export const App = () => {
  return (
    <Router>
      <div className={styles.wrapper}>
        <Routes>
          <Route path="/" element={<Routeroot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
};


import '../reset.css';
import './tailwind.css';

import { useState } from 'react';

import styles from './App.module.css';
import Login from './Login';

export const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const goLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className={styles.wrapper}>
      {!showLogin ? (
        <>
          <div className="flex-col flex items-center gap-4">
            <img src="/assets/logo.svg" width="60" height="60" alt="logo" />
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
              <img
                src="/assets/kakao.png"
                className="w-11 h-11 rounded-full"
                alt="kakao"
              />
              <img
                src="/assets/google.png"
                className="w-11 h-11 rounded-full"
                alt="google"
              />
              <img
                src="/assets/facebook.png"
                className="w-11 h-11 rounded-full"
                alt="facebook"
              />
              <img
                src="/assets/apple.png"
                className="w-11 h-11 rounded-full"
                alt="apple"
              />
            </div>
          </div>
        </>
      ) : (
        <Login goLogin={goLogin} />
      )}
    </div>
  );
};

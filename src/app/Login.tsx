import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

import styles from './Login.module.css';

interface LoginProps {
  goLogin?: () => void;
}

type LoginResponse = {
  user_id: string;
  token: string;
  message: string;
};

type UserData = {
  nickname: {
    nickname: string;
    tag: string;
  };
};

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate(); // useNavigate 사용

  const isFormFilled = username !== '' && password !== '';

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      const loginResponse = await fetch(
        'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/auth/login_local',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: username,
            password: password,
          }),
        },
      );

      // 명확한 타입을 반환
      const loginData: LoginResponse =
        (await loginResponse.json()) as LoginResponse;

      if (loginData.token !== '') {
        localStorage.setItem('token', loginData.token); // 토큰을 localStorage에 저장

        const userResponse = await fetch(
          'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/users/me',
          {
            method: 'GET',
            headers: {
              'x-access-token': loginData.token, // localStorage에 저장된 token을 사용
            },
          },
        );

        // 사용자 데이터를 명확하게 타입 지정하여 처리
        const userData: UserData = (await userResponse.json()) as UserData;

        setNickname(`${userData.nickname.nickname}#${userData.nickname.tag}`);

        // 로그인 성공 후 시간표 페이지로 이동
        navigate('/timetable');
      } else {
        console.error('로그인 실패:', loginData.message);
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  return (
    <div className={styles.container}>
      {nickname === '' ? (
        <>
          {/* '뒤로' 버튼 */}
          <a
            onClick={() => {
              navigate('/');
            }}
            className={styles.backButton}
          >
            &lt; 뒤로
          </a>

          <h2 className={styles.title}>로그인</h2>

          <form
            onSubmit={(e) => {
              void handleLogin(e);
            }}
          >
            <div>
              <label className={styles.label} htmlFor="username">
                아이디
              </label>
              <input
                id="username"
                type="text"
                placeholder="아이디를 입력하세요"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>

            <div>
              <a className={styles.linkButton} href="#">
                아이디 찾기
              </a>
              <span className={styles.divider}>|</span>
              <a className={styles.linkButton} href="#">
                비밀번호 찾기
              </a>
            </div>

            <button
              type="submit"
              className={`${styles.loginButton ?? ''} ${isFormFilled ? (styles.active ?? '') : ''}`}
            >
              로그인
            </button>
          </form>
        </>
      ) : (
        <p>로그인된 사용자: {nickname}</p>
      )}
    </div>
  );
};

export default Login;

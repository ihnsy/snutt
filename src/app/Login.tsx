import { useState } from 'react';

import styles from '@/app/Login.module.css';
import { useNavigation } from '@/app/useNavigate';

export const Login = () => {
  const { goLanding } = useNavigation();
  const { goTimetable } = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string>('');
  const [nickname, setNickname] = useState('');

  const isFormFilled = username !== '' && password !== '';

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

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

    const loginData: LoginResponse =
      (await loginResponse.json()) as LoginResponse;
    localStorage.setItem('token', loginData.token);

    if (loginData.token !== '') {
      setToken(loginData.token);

      if (token !== '') {
        const userResponse = await fetch(
          'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/users/me',
          {
            method: 'GET',
            headers: {
              'x-access-token': token,
            },
          },
        );
        const userData: UserData = (await userResponse.json()) as UserData;
        setNickname(`${userData.nickname.nickname}#${userData.nickname.tag}`);
      }
    }
  }

  return (
    <div className={styles.container}>
      {nickname === '' ? (
        <div>
          {/* '뒤로' 버튼 */}
          <a onClick={goLanding} className={styles.backButton}>
            &lt; 뒤로
          </a>

          <h2 className={styles.title}>로그인</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void (async () => {
                try {
                  await handleLogin(e);
                } catch (error) {
                  console.error('로그인 중 오류 발생:', error);
                }
              })();
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

            {/* 아이디 찾기 / 비밀번호 찾기 버튼과 구분 기호 */}
            <div>
              <a className={styles.linkButton} href="#">
                아이디 찾기
              </a>
              <span className={styles.divider}>|</span> {/* 구분 기호 */}
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
        </div>
      ) : (
        goTimetable()
      )}
    </div>
  );
};

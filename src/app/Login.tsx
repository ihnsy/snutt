import { useState } from 'react';

import styles from './Login.module.css';

interface LoginProps {
  goLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ goLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string>('');
  const [nickname, setNickname] = useState('');

  const isFormFilled = username !== '' && password !== '';

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault(); // Prevent the form from refreshing the page

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

    // Step 1: Send POST request for login
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

      // Step 2: Send GET request to get user information
      if (token !== '') {
        // token이 null이 아니고 빈 문자열도 아닌 경우
        const userResponse = await fetch(
          'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/users/me',
          {
            method: 'GET',
            headers: {
              'x-access-token': token, // token이 null이 아닐 때만 여기에 올 수 있음
            },
          },
        );
        const userData: UserData = (await userResponse.json()) as UserData;
        setNickname(`${userData.nickname.nickname}#${userData.nickname.tag}`);
      }
    }
  }

  return (
    <div>
      {nickname === '' ? (
        <>
          <button onClick={goLogin}>뒤로</button>
          <div className="flex-col ">
            <h2 className={styles.title}>로그인</h2>
            <form
              className="flex flex-col items-start gap-4"
              onSubmit={handleLogin}
            >
              <input
                type="text"
                placeholder="아이디"
                className="border rounded p-2 w-64"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="border rounded p-2 w-64"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <button
                type="submit"
                className={`${styles.loginButton ?? ''} ${isFormFilled ? (styles.active ?? '') : ''}`}
                disabled={!isFormFilled}
              >
                로그인
              </button>
            </form>
          </div>
        </>
      ) : (
        <p>로그인된 사용자: {nickname}</p>
      )}
    </div>
  );
};

export default Login;

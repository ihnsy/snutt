import { useState } from 'react';

import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFormFilled = username !== '' && password !== '';

  return (
    <div className="flex-col flex items-center gap-6 px-3 py-0">
      <h2 className={styles.title}>로그인</h2>
      <form className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="아이디"
          className="border rounded p-2 w-64"
          value={username}
          onChange={(e) => { setUsername(e.target.value); }}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="border rounded p-2 w-64"
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
          required
        />
      </form>
      <button
        type="submit"
        className={`${styles.loginButton ?? ''} ${isFormFilled ? (styles.active ?? '') : ''}`}
        disabled={!isFormFilled}
      >
        로그인
      </button>
    </div>
  );
};

export default Login;
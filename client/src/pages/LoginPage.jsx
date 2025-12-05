import React from 'react';
import { useNavigate } from 'react-router';

export default function LoginPage({ loginHandler }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginHandler(e);
      navigate('/'); 
    } catch (err) {
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Вход</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Пароль</label><br />
          <input type="password" name="password" required />
        </div>

        <br />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

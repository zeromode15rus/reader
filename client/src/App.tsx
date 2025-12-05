import React, { useState, useEffect } from 'react';
import { setAccessToken } from '../src/shared/axiosinstance';
import axios from 'axios';
import Router from './app/router/Router';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/auth/refresh')
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        console.log('Пользователь не авторизован');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const registerHandler = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      const response = await axios.post('/api/auth/register', data);
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert(error.response?.data?.message || 'Ошибка при регистрации');
      throw error;
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      const response = await axios.post('/api/auth/login', data);
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Ошибка входа:', error);
      alert(error.response?.data?.message || 'Ошибка при входе');
    }
  };

  const logoutHandler = () => {
    axios.delete('/api/auth/logout').then(() => {
      setUser(null);
      setAccessToken(null);
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <Router
      registerHandler={registerHandler}
      loginHandler={loginHandler}
      user={user}
      logoutHandler={logoutHandler}
    />
  );
}

export default App;

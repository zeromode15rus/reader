import React from 'react';
import { Link } from 'react-router';

function NavBar({ logoutHandler, user }) {
  return (
    <nav>
      <div>
        <Link to="/">Главная</Link>
        {' | '}
        
        {!user && (
          <>
            <Link to="/account/new">Регистрация</Link>
            {' | '}
            <Link to="/account/login">Вход</Link>
          </>
        )}

        {user && (
          <>
            <span>Привет, {user.name}</span>
            {' | '}
            <button onClick={logoutHandler}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

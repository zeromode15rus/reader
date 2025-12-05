import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../widgets/NavBar';

export default function Layout({ logoutHandler, user }) {
  return (
    <>
      <NavBar logoutHandler={logoutHandler} user={user} />
      <Outlet />
    </>
  );
}

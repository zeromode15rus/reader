import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from '../Layout';
import Home from '../../pages/Home';
import RegisterPage from '../../pages/RegistrationPage';
import LoginPage from '../../pages/LoginPage';
import ProtectedRoute from '../../shared/ProtectedRoute';
import Reader from '../../pages/Reader'

function Router({ registerHandler, user, logoutHandler, loginHandler }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout logoutHandler={logoutHandler} user={user} />}>
          <Route path="/" element={<Home user={user} />} />

          <Route
            path="/account/new"
            element={
              <ProtectedRoute isAllowed={!user} redirectTo="/">
                <RegisterPage registerHandler={registerHandler} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account/login"
            element={
              <ProtectedRoute isAllowed={!user} redirectTo="/">
                <LoginPage loginHandler={loginHandler} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reader"
            element={
              <ProtectedRoute isAllowed={!!user} redirectTo="/">
                <Reader  />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EventsPage from './pages/EventsPage/EventsPage';
import ChatPage from './pages/ChatPage/ChatPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ZootaxiPage from './pages/ZootaxiPage/ZootaxiPage';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/*публичные страницы*/}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/*приватные страницы*/}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/services"
          element={
            <PrivateRoute>
              <ServicesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/zootaxi/new"
          element={
            <PrivateRoute>
              <ZootaxiPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/zootaxi/history"
          element={
            <PrivateRoute>
              <ZootaxiPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/zootaxi/rules"
          element={
            <PrivateRoute>
              <ZootaxiPage />
            </PrivateRoute>
          }
        />

        {/*редирект по умолчанию*/}
        <Route
          path="/"
          element={
            JSON.parse(localStorage.getItem("userId")) ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/*404 можно добавить потом*/}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

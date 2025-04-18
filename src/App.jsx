import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.scss";

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ProfilePage from './pages/ProfilePage/ProfilePage';

const App = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  return (
      <Router>
        <Routes>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </Router>
  )
}

export default App
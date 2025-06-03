import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.scss";

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EventsPage from './pages/EventsPage/EventsPage';
import ChatPage from './pages/ChatPage/ChatPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ZootaxiPage from './pages/ZootaxiPage/ZootaxiPage';

const App = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  return (
      <Router>
        <Routes>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:id" element={<ChatPage />} /> 
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/zootaxi/new" element={<ZootaxiPage />} />
          <Route path="/zootaxi/history" element={<ZootaxiPage />} />
          <Route path="/zootaxi/rules" element={<ZootaxiPage />} />
        </Routes>
      </Router>
  )
}

export default App
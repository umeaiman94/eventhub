import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/CreateEventPage';
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import LoginPage from './pages/LoginPage';
import sampleEvents from './data/sampleEvents';

function App() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(sampleEvents);
  const [registrations, setRegistrations] = useState([]);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<HomePage events={events} />} />
          <Route path="/event/:id" element={
            <EventDetailPage
              events={events}
              user={user}
              registrations={registrations}
              setRegistrations={setRegistrations}
            />}
          />
          <Route path="/create" element={
            user
              ? <CreateEventPage setEvents={setEvents} user={user} />
              : <Navigate to="/login" />}
          />
          <Route path="/my-registrations" element={
            user
              ? <MyRegistrationsPage registrations={registrations} />
              : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
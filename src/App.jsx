import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import NotificationPrompt from './components/NotificationPrompt';
import LoginNudge from './components/LoginNudge';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/CreateEventPage';
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import LoginPage from './pages/LoginPage';
import sampleEvents from './data/sampleEvents';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [events, setEvents] = useState(sampleEvents);
  const [registrations, setRegistrations] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [showNotifPrompt, setShowNotifPrompt] = useState(false);
  const [showLoginNudge, setShowLoginNudge] = useState(false);

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Show notification prompt after splash ends
  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => setShowNotifPrompt(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Show login nudge after 5 seconds if not logged in
  useEffect(() => {
    if (!showSplash && !user) {
      const timer = setTimeout(() => setShowLoginNudge(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSplash, user]);

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: theme === 'dark' ? '#080d14' : '#f0f4ff' }}>
        <Navbar
          user={user}
          setUser={setUser}
          theme={theme}
          setTheme={setTheme}
          userEmail={userEmail}
        />

        {showNotifPrompt && (
          <NotificationPrompt
            onClose={() => setShowNotifPrompt(false)}
            theme={theme}
          />
        )}

        {showLoginNudge && !user && (
          <LoginNudge
            onClose={() => setShowLoginNudge(false)}
            theme={theme}
          />
        )}

        <Routes>
          <Route path="/" element={
            <HomePage events={events} theme={theme} />}
          />
          <Route path="/event/:id" element={
            <EventDetailPage
              events={events}
              user={user}
              theme={theme}
              registrations={registrations}
              setRegistrations={setRegistrations}
            />}
          />
          <Route path="/create" element={
            user
              ? <CreateEventPage setEvents={setEvents} user={user} theme={theme} />
              : <Navigate to="/login" />}
          />
          <Route path="/my-registrations" element={
            user
              ? <MyRegistrationsPage registrations={registrations} theme={theme} />
              : <Navigate to="/login" />}
          />
          <Route path="/login" element={
            <LoginPage
              setUser={setUser}
              setUserEmail={setUserEmail}
              theme={theme}
            />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
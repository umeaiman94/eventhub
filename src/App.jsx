import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import NotificationPrompt from './components/NotificationPrompt';
import LoginNudge from './components/LoginNudge';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/CreateEventPage';
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EditProfilePage from './pages/EditProfilePage';
import GalleryPage from './pages/GalleryPage';
import CategoriesPage from './pages/CategoriesPage';
import { getEvents } from './api';
import OrganizerDashboardPage from './pages/OrganizerDashboardPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('attendee');
  const [organizerVerified, setOrganizerVerified] = useState(false);
  const [events, setEvents] = useState([]);
 // eslint-disable-next-line no-unused-vars
  const [registrations, setRegistrations] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [showNotifPrompt, setShowNotifPrompt] = useState(false);
  const [showLoginNudge, setShowLoginNudge] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(true);

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Check for saved token on page refresh
  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload.name);
      setUserEmail(payload.email);
      setUserRole(payload.role || 'attendee');
      setOrganizerVerified(payload.organizerVerified || false);
    } catch {
      localStorage.removeItem('token');
    }
  }
}, []);

  // Load events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEvents(res.data);
      } catch (err) {
        console.log('Could not load events:', err.message);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Show notification prompt after splash
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

  // Logout helper — clears token too
  const handleSetUser = (userData) => {
    if (!userData) localStorage.removeItem('token');
    setUser(userData);
  };

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        background: theme === 'dark' ? '#080d14' : '#f0f4ff',
        display: 'flex', flexDirection: 'column',
      }}>
        <Navbar
  user={user} setUser={handleSetUser}
  theme={theme} setTheme={setTheme}
  userEmail={userEmail}
  userRole={userRole}
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

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={
              <HomePage
                events={events}
                theme={theme}
                loading={eventsLoading}
              />}
            />
            <Route path="/event/:id" element={
  <EventDetailPage
    events={events}
    user={user}
    theme={theme}
  />}
/>
            <Route path="/create" element={
  user
    ? <CreateEventPage
        setEvents={setEvents}
        user={user}
        theme={theme}
        userRole={userRole}
        organizerVerified={organizerVerified}
      />
    : <Navigate to="/login" />}
/>
            <Route path="/my-registrations" element={
  user
    ? <MyRegistrationsPage theme={theme} />
    : <Navigate to="/login" />}
/>
            <Route path="/login" element={
              <LoginPage
                setUser={handleSetUser}
                setUserEmail={setUserEmail}
                theme={theme}
              />}
            />
            <Route path="/signup" element={
  <SignupPage
    setUser={handleSetUser}
    setUserEmail={setUserEmail}
    setUserRole={setUserRole}
    setOrganizerVerified={setOrganizerVerified}
    theme={theme}
  />}
/>
            <Route path="/edit-profile" element={
              user
                ? <EditProfilePage
                    user={user} setUser={handleSetUser}
                    userEmail={userEmail} setUserEmail={setUserEmail}
                    theme={theme}
                  />
                : <Navigate to="/login" />}
            />
            <Route path="/gallery" element={
  <GalleryPage
    theme={theme}
    user={user}
    userRole={userRole}
    events={events}
  />}
/>
            <Route path="/categories" element={
              <CategoriesPage events={events} theme={theme} />}
            />
             <Route path="/dashboard" element={
  user && userRole === 'organizer'
    ? <OrganizerDashboardPage theme={theme} user={user} />
    : <Navigate to="/login" />}
/>
<Route path="/settings" element={
  user
    ? <SettingsPage
        theme={theme} setTheme={setTheme}
        user={user} setUser={handleSetUser}
        userEmail={userEmail} setUserEmail={setUserEmail}
      />
    : <Navigate to="/login" />}
/>
<Route path="/help" element={<HelpPage theme={theme} />} />
          </Routes>
          
        </div>

        <Footer theme={theme} />
      </div>
    </BrowserRouter>
  );
}

export default App;
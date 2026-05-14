import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser, theme, setTheme }) {
  const navigate = useNavigate();
  const dark = theme === 'dark';

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={{
      background: dark ? '#080d14' : '#ffffff',
      borderBottom: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'background 0.3s ease',
    }}>

      {/* Logo */}
      <Link to="/" style={{
        textDecoration: 'none',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '10px',
          background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', fontWeight: 900, color: '#fff',
        }}>E</div>
        <span style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px',
        }}>
          Event<span style={{ color: '#0099ff' }}>Hub</span>
        </span>
      </Link>

      {/* Right Side */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>

        {/* Browse Events */}
        <Link to="/" style={{
          color: dark ? '#aaa' : '#555',
          textDecoration: 'none',
          fontFamily: "'Syne', sans-serif", fontWeight: 600,
          fontSize: '0.85rem', padding: '8px 16px', borderRadius: '8px',
        }}>Browse Events</Link>

        {/* My Registrations - only when logged in */}
        {user && (
          <Link to="/my-registrations" style={{
            color: dark ? '#aaa' : '#555',
            textDecoration: 'none',
            fontFamily: "'Syne', sans-serif", fontWeight: 600,
            fontSize: '0.85rem', padding: '8px 16px', borderRadius: '8px',
          }}>My Registrations</Link>
        )}

        {/* Host Event */}
        <Link to="/create" style={{
          background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
          color: '#fff', textDecoration: 'none',
          borderRadius: '8px', padding: '8px 16px',
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: '0.85rem',
        }}>+ Host Event</Link>

        {/* Theme Toggle */}
        <button onClick={() => setTheme(dark ? 'light' : 'dark')} style={{
          background: dark ? '#0d1a28' : '#f0f4ff',
          border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
          borderRadius: '8px', padding: '8px 12px',
          cursor: 'pointer', fontSize: '1rem',
          transition: 'all 0.2s ease',
        }}>
          {dark ? '☀️' : '🌙'}
        </button>

        {/* User Avatar or Login */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '0.9rem',
            }}>{user[0].toUpperCase()}</div>
            <button onClick={handleLogout} style={{
              background: 'transparent',
              color: dark ? '#aaa' : '#555',
              border: `1px solid ${dark ? '#333' : '#ddd'}`,
              borderRadius: '8px', padding: '6px 12px',
              cursor: 'pointer', fontSize: '0.8rem',
              fontFamily: "'Syne', sans-serif",
            }}>Logout</button>
          </div>
        ) : (
          <Link to="/login" style={{
            background: 'transparent',
            color: dark ? '#aaa' : '#555',
            border: `1px solid ${dark ? '#333' : '#ddd'}`,
            borderRadius: '8px', padding: '8px 14px',
            textDecoration: 'none',
            fontFamily: "'Syne', sans-serif", fontSize: '0.85rem',
          }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
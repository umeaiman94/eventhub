import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={{
      background: '#0a0a0f',
      borderBottom: '1px solid #1e1e2e',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '10px',
          background: 'linear-gradient(135deg, #6c63ff, #e040fb)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', fontWeight: 900, color: '#fff',
        }}>E</div>
        <span style={{
          color: '#fff', fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px'
        }}>
          Event<span style={{ color: '#6c63ff' }}>Hub</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link to="/" style={{
          color: '#aaa', textDecoration: 'none',
          fontFamily: "'Syne', sans-serif", fontWeight: 600,
          fontSize: '0.85rem', padding: '8px 16px',
          borderRadius: '8px',
        }}>Browse Events</Link>

        {user && (
          <Link to="/my-registrations" style={{
            color: '#aaa', textDecoration: 'none',
            fontFamily: "'Syne', sans-serif", fontWeight: 600,
            fontSize: '0.85rem', padding: '8px 16px',
            borderRadius: '8px',
          }}>My Registrations</Link>
        )}

        <Link to="/create" style={{
          background: 'linear-gradient(135deg, #6c63ff, #e040fb)',
          color: '#fff', textDecoration: 'none',
          borderRadius: '8px', padding: '8px 16px',
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: '0.85rem',
        }}>+ Host Event</Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6c63ff, #e040fb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '0.9rem',
            }}>{user[0].toUpperCase()}</div>
            <button onClick={handleLogout} style={{
              background: 'transparent', color: '#aaa',
              border: '1px solid #333', borderRadius: '8px',
              padding: '6px 12px', cursor: 'pointer',
              fontSize: '0.8rem', fontFamily: "'Syne', sans-serif",
            }}>Logout</button>
          </div>
        ) : (
          <Link to="/login" style={{
            background: 'transparent', color: '#aaa',
            border: '1px solid #333', borderRadius: '8px',
            padding: '8px 14px', textDecoration: 'none',
            fontFamily: "'Syne', sans-serif", fontSize: '0.85rem',
          }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
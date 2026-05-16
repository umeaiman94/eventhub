import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser, theme, setTheme, userEmail }) {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <nav style={{
      background: dark ? '#080d14' : '#ffffff',
      borderBottom: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
      padding: '0 2rem',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px', position: 'sticky',
      top: 0, zIndex: 100,
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
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
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

        <Link to="/" style={{
          color: dark ? '#aaa' : '#555', textDecoration: 'none',
          fontFamily: "'Syne', sans-serif", fontWeight: 600,
          fontSize: '0.85rem', padding: '8px 16px', borderRadius: '8px',
        }}>Browse Events</Link>

        {user && (
          <Link to="/my-registrations" style={{
            color: dark ? '#aaa' : '#555', textDecoration: 'none',
            fontFamily: "'Syne', sans-serif", fontWeight: 600,
            fontSize: '0.85rem', padding: '8px 16px', borderRadius: '8px',
          }}>My Registrations</Link>
        )}

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

        {/* User Avatar with Dropdown */}
        {user ? (
          <div style={{ position: 'relative' }}>

            {/* Avatar Button */}
            <div
              onClick={() => setShowDropdown(prev => !prev)}
              onMouseEnter={() => setShowDropdown(true)}
              style={{
                display: 'flex', alignItems: 'center',
                gap: '8px', cursor: 'pointer',
                padding: '4px 10px 4px 4px',
                borderRadius: '30px',
                background: dark ? '#0d1a28' : '#f0f4ff',
                border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#fff',
                fontWeight: 700, fontSize: '0.9rem',
              }}>{user[0].toUpperCase()}</div>
              <span style={{
                color: dark ? '#fff' : '#0a1628',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600, fontSize: '0.85rem',
              }}>{user}</span>
              <span style={{
                color: dark ? '#888' : '#aaa',
                fontSize: '0.7rem',
              }}>▾</span>
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div
                onMouseLeave={() => setShowDropdown(false)}
                style={{
                  position: 'absolute', top: '110%', right: 0,
                  width: 280, zIndex: 999,
                  background: dark ? '#0d1a28' : '#ffffff',
                  border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                  borderRadius: '16px', overflow: 'hidden',
                  boxShadow: dark
                    ? '0 12px 40px rgba(0,0,0,0.4)'
                    : '0 12px 40px rgba(0,0,0,0.1)',
                  animation: 'dropIn 0.2s ease',
                }}>

                {/* Profile Header */}
                <div style={{
                  padding: '16px',
                  borderBottom: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                  background: dark ? '#080d14' : '#f8faff',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    marginBottom: '12px',
                  }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: '#fff',
                      fontWeight: 700, fontSize: '1.2rem',
                      boxShadow: '0 0 16px rgba(0,153,255,0.3)',
                    }}>{user[0].toUpperCase()}</div>
                    <div>
                      <p style={{
                        color: dark ? '#fff' : '#0a1628',
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800, fontSize: '0.95rem', margin: 0,
                      }}>{user}</p>
                      <p style={{
                        color: '#0099ff', fontSize: '0.78rem', margin: '2px 0 0',
                        fontFamily: "'Syne', sans-serif",
                      }}>{userEmail}</p>
                    </div>
                  </div>

                  {/* 3 Summary Lines */}
                  {[
                    { icon: '🎟️', text: 'Member since May 2026' },
                    { icon: '📍', text: 'Rawalpindi, Pakistan' },
                    { icon: '⭐', text: 'Free Account' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center',
                      gap: '8px', marginTop: '6px',
                    }}>
                      <span style={{ fontSize: '0.8rem' }}>{item.icon}</span>
                      <span style={{
                        color: dark ? '#888' : '#666',
                        fontSize: '0.78rem',
                        fontFamily: "'Syne', sans-serif",
                      }}>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Menu Items */}
                {[
                  { icon: '⚙️', label: 'Settings', action: () => alert('Settings coming soon!') },
                  { icon: '❓', label: 'Help & Support', action: () => alert('Help coming soon!') },
                ].map((item, i) => (
                  <button key={i} onClick={() => { item.action(); setShowDropdown(false); }}
                    style={{
                      width: '100%', display: 'flex',
                      alignItems: 'center', gap: '10px',
                      padding: '12px 16px', background: 'transparent',
                      border: 'none', cursor: 'pointer',
                      borderBottom: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                      color: dark ? '#ccc' : '#444',
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '0.88rem', fontWeight: 600,
                      textAlign: 'left',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = dark ? '#0a1628' : '#f0f8ff'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}

                {/* Logout */}
                <button onClick={handleLogout} style={{
                  width: '100%', display: 'flex',
                  alignItems: 'center', gap: '10px',
                  padding: '12px 16px', background: 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: '#ff4d4d',
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.88rem', fontWeight: 600,
                  textAlign: 'left',
                  transition: 'background 0.2s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = dark ? '#2a0a0a' : '#fff0f0'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '1rem' }}>🚪</span>
                  Logout
                </button>

              </div>
            )}

            <style>{`
              @keyframes dropIn {
                from { opacity: 0; transform: translateY(-8px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
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
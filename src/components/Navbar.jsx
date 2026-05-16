import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser, theme, setTheme, userEmail }) {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
    setShowDrawer(false);
    navigate('/');
  };

  return (
    <>
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

        {/* Hamburger Button - mobile only */}
        <button
          className="hamburger"
          onClick={() => setShowDrawer(true)}
          style={{
            background: 'transparent',
            border: 'none', cursor: 'pointer',
            display: 'none',
            flexDirection: 'column',
            gap: '5px', padding: '8px',
          }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 22, height: 2, borderRadius: 2,
              background: dark ? '#fff' : '#0a1628',
            }} />
          ))}
        </button>

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

        {/* Desktop Nav Links */}
        <div className="desktop-nav" style={{
          display: 'flex', gap: '8px', alignItems: 'center',
        }}>
          <Link to="/" className="nav-link" style={{
            color: dark ? '#aaa' : '#555',
            fontFamily: "'Syne', sans-serif", fontWeight: 600,
            fontSize: '0.85rem', padding: '8px 16px', borderRadius: '8px',
          }}>Browse Events</Link>

          <Link to="/gallery" className="nav-link" style={{
            color: dark ? '#aaa' : '#555',
            fontFamily: "'Syne', sans-serif", fontWeight: 600,
            fontSize: '0.85rem', padding: '8px 16px', borderRadius: '8px',
          }}>Gallery</Link>

          {user && (
            <Link to="/my-registrations" className="nav-link" style={{
              color: dark ? '#aaa' : '#555',
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
                }}>
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
                <span style={{ color: dark ? '#888' : '#aaa', fontSize: '0.7rem' }}>▾</span>
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
                      display: 'flex', alignItems: 'center',
                      gap: '12px', marginBottom: '12px',
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
                          color: '#0099ff', fontSize: '0.78rem',
                          margin: '2px 0 0',
                          fontFamily: "'Syne', sans-serif",
                        }}>{userEmail}</p>
                      </div>
                    </div>

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
                    { icon: '✏️', label: 'Edit Profile', action: () => navigate('/edit-profile') },
                    { icon: '⚙️', label: 'Settings', action: () => alert('Settings coming soon!') },
                    { icon: '❓', label: 'Help & Support', action: () => alert('Help coming soon!') },
                  ].map((item, i) => (
                    <button key={i}
                      onClick={() => { item.action(); setShowDropdown(false); }}
                      onMouseEnter={e => e.currentTarget.style.background = dark ? '#0a1628' : '#f0f8ff'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      style={{
                        width: '100%', display: 'flex',
                        alignItems: 'center', gap: '10px',
                        padding: '12px 16px', background: 'transparent',
                        border: 'none', cursor: 'pointer',
                        borderBottom: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                        color: dark ? '#ccc' : '#444',
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '0.88rem', fontWeight: 600,
                        textAlign: 'left', transition: 'background 0.2s ease',
                      }}>
                      <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}

                  {/* Logout */}
                  <button onClick={handleLogout}
                    onMouseEnter={e => e.currentTarget.style.background = dark ? '#2a0a0a' : '#fff0f0'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    style={{
                      width: '100%', display: 'flex',
                      alignItems: 'center', gap: '10px',
                      padding: '12px 16px', background: 'transparent',
                      border: 'none', cursor: 'pointer',
                      color: '#ff4d4d',
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '0.88rem', fontWeight: 600,
                      textAlign: 'left', transition: 'background 0.2s ease',
                    }}>
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
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

      {/* Hamburger Drawer */}
      {showDrawer && (
        <>
          <div className="drawer-overlay" onClick={() => setShowDrawer(false)} />
          <div className="drawer" style={{
            background: dark ? '#0d1a28' : '#ffffff',
            borderRight: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
            display: 'flex', flexDirection: 'column',
            padding: '0',
          }}>
            {/* Drawer Header */}
            <div style={{
              padding: '20px',
              borderBottom: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center',
              background: dark ? '#080d14' : '#f8faff',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '8px',
                  background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 900,
                  color: '#fff', fontSize: '16px',
                }}>E</div>
                <span style={{
                  color: dark ? '#fff' : '#0a1628',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800, fontSize: '1.1rem',
                }}>Event<span style={{ color: '#0099ff' }}>Hub</span></span>
              </div>
              <button onClick={() => setShowDrawer(false)} style={{
                background: 'transparent', border: 'none',
                color: dark ? '#888' : '#aaa',
                fontSize: '1.3rem', cursor: 'pointer',
              }}>✕</button>
            </div>

            {/* User Info in Drawer */}
            {user && (
              <div style={{
                padding: '16px 20px',
                borderBottom: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#fff',
                    fontWeight: 700, fontSize: '1.1rem',
                  }}>{user[0].toUpperCase()}</div>
                  <div>
                    <p style={{
                      color: dark ? '#fff' : '#0a1628',
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800, fontSize: '0.9rem', margin: 0,
                    }}>{user}</p>
                    <p style={{
                      color: '#0099ff', fontSize: '0.75rem', margin: '2px 0 0',
                    }}>{userEmail}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Drawer Links */}
            <div style={{ flex: 1, padding: '12px 0' }}>
              {[
                { icon: '🏠', label: 'Home', path: '/' },
                { icon: '🖼️', label: 'Gallery', path: '/gallery' },
                { icon: '🗂️', label: 'Categories', path: '/categories' },
                ...(user ? [{ icon: '🎟️', label: 'My Registrations', path: '/my-registrations' }] : []),
              ].map((item, i) => (
                <button key={i}
                  onClick={() => { navigate(item.path); setShowDrawer(false); }}
                  onMouseEnter={e => e.currentTarget.style.background = dark ? '#0a1628' : '#f0f8ff'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  style={{
                    width: '100%', display: 'flex',
                    alignItems: 'center', gap: '14px',
                    padding: '14px 20px', background: 'transparent',
                    border: 'none', cursor: 'pointer',
                    color: dark ? '#ccc' : '#444',
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '0.95rem', fontWeight: 600,
                    textAlign: 'left', transition: 'background 0.2s ease',
                  }}>
                  <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Drawer Footer */}
            <div style={{
              padding: '16px 20px',
              borderTop: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
            }}>
              {/* Theme Toggle */}
              <button onClick={() => setTheme(dark ? 'light' : 'dark')} style={{
                width: '100%', display: 'flex',
                alignItems: 'center', gap: '14px',
                padding: '12px 0', background: 'transparent',
                border: 'none', cursor: 'pointer',
                color: dark ? '#ccc' : '#444',
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.95rem', fontWeight: 600,
                marginBottom: '8px',
              }}>
                <span>{dark ? '☀️' : '🌙'}</span>
                {dark ? 'Light Mode' : 'Dark Mode'}
              </button>

              {user ? (
                <button onClick={handleLogout} style={{
                  width: '100%', display: 'flex',
                  alignItems: 'center', gap: '14px',
                  padding: '12px 0', background: 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: '#ff4d4d',
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.95rem', fontWeight: 600,
                }}>
                  <span>🚪</span> Logout
                </button>
              ) : (
                <button onClick={() => { navigate('/login'); setShowDrawer(false); }} style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
                  color: '#fff', border: 'none', borderRadius: '10px',
                  padding: '12px', cursor: 'pointer',
                  fontFamily: "'Syne', sans-serif", fontWeight: 700,
                }}>Login / Sign Up</button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
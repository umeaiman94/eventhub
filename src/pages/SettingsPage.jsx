import React, { useState } from 'react';
// removed unused navigate

function SettingsPage({ theme, setTheme, user, setUser, userEmail, setUserEmail }) {
  const dark = theme === 'dark';
  
  const [name, setName] = useState(user || '');
  const [email, setEmail] = useState(userEmail || '');
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('PKT (UTC+5)');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState('');

  const cardStyle = {
    background: dark ? '#0d1a28' : '#ffffff',
    border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
    borderRadius: '16px', padding: '24px',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    background: dark ? '#080d14' : '#f8faff',
    border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
    color: dark ? '#fff' : '#0a1628', fontSize: '0.9rem',
    outline: 'none', fontFamily: "'Syne', sans-serif",
    boxSizing: 'border-box',
  };

  const labelStyle = {
    color: dark ? '#aaa' : '#555', fontSize: '0.85rem',
    fontFamily: "'Syne', sans-serif",
    display: 'block', marginBottom: '6px',
  };

  const sectionTitle = (icon, title) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      marginBottom: '20px',
      paddingBottom: '12px',
      borderBottom: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
    }}>
      <span style={{ fontSize: '1.2rem' }}>{icon}</span>
      <h2 style={{
        color: dark ? '#fff' : '#0a1628',
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800, fontSize: '1.1rem', margin: 0,
      }}>{title}</h2>
    </div>
  );

  const handleSaveProfile = () => {
    setUser(name);
    setUserEmail(email);
    setSaved('profile');
    setTimeout(() => setSaved(''), 2000);
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 2rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{
          color: '#0099ff', fontFamily: "'Syne', sans-serif",
          fontWeight: 700, letterSpacing: '3px',
          fontSize: '0.75rem', marginBottom: '8px',
        }}>ACCOUNT</p>
        <h1 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900, fontSize: '2rem', margin: 0,
        }}>Settings</h1>
      </div>

      {/* Edit Profile */}
      <div style={cardStyle}>
        {sectionTitle('✏️', 'Edit Profile')}
        <label style={labelStyle}>Full Name</label>
        <input
          value={name} onChange={e => setName(e.target.value)}
          style={{ ...inputStyle, marginBottom: '16px' }}
        />
        <label style={labelStyle}>Email</label>
        <input
          value={email} onChange={e => setEmail(e.target.value)}
          type="email" style={{ ...inputStyle, marginBottom: '20px' }}
        />
        <button onClick={handleSaveProfile} style={{
          background: saved === 'profile'
            ? 'linear-gradient(135deg, #00c896, #00e5ff)'
            : 'linear-gradient(135deg, #0099ff, #00e5ff)',
          color: '#fff', border: 'none', borderRadius: '10px',
          padding: '11px 24px', cursor: 'pointer',
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          transition: 'background 0.3s ease',
        }}>
          {saved === 'profile' ? '✅ Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Theme */}
      <div style={cardStyle}>
        {sectionTitle('🎨', 'Theme')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { value: 'dark', icon: '🌙', label: 'Dark Mode', desc: 'Easy on the eyes' },
            { value: 'light', icon: '☀️', label: 'Light Mode', desc: 'Bright and clean' },
          ].map(opt => (
            <div
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              style={{
                padding: '16px', borderRadius: '12px', cursor: 'pointer',
                border: `2px solid ${theme === opt.value ? '#0099ff' : dark ? '#0f2e4e' : '#e0e0f0'}`,
                background: theme === opt.value
                  ? dark ? '#0a1e30' : '#e0f0ff'
                  : dark ? '#080d14' : '#f8faff',
                textAlign: 'center', transition: 'all 0.2s ease',
              }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{opt.icon}</div>
              <p style={{
                color: dark ? '#fff' : '#0a1628',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: '0.9rem', margin: '0 0 4px',
              }}>{opt.label}</p>
              <p style={{
                color: dark ? '#888' : '#666',
                fontSize: '0.75rem', margin: 0,
              }}>{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div style={cardStyle}>
        {sectionTitle('🔔', 'Notifications')}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '14px',
        }}>
          <div>
            <p style={{
              color: dark ? '#fff' : '#0a1628',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: '0.9rem', margin: '0 0 4px',
            }}>Email Notifications</p>
            <p style={{ color: dark ? '#888' : '#666', fontSize: '0.8rem', margin: 0 }}>
              Get notified about new events matching your interests
            </p>
          </div>
          <div
            onClick={() => setNotifications(!notifications)}
            style={{
              width: 48, height: 26, borderRadius: '13px',
              background: notifications
                ? 'linear-gradient(135deg, #0099ff, #00e5ff)'
                : dark ? '#1a2a3a' : '#ddd',
              cursor: 'pointer', position: 'relative',
              transition: 'background 0.3s ease', flexShrink: 0,
            }}>
            <div style={{
              position: 'absolute', top: 3,
              left: notifications ? 25 : 3,
              width: 20, height: 20, borderRadius: '50%',
              background: '#fff', transition: 'left 0.3s ease',
            }} />
          </div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <p style={{
              color: dark ? '#fff' : '#0a1628',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: '0.9rem', margin: '0 0 4px',
            }}>Browser Notifications</p>
            <p style={{ color: dark ? '#888' : '#666', fontSize: '0.8rem', margin: 0 }}>
              Push notifications in your browser
            </p>
          </div>
          <button
            onClick={() => {
              if ('Notification' in window) {
                Notification.requestPermission();
              }
            }}
            style={{
              background: dark ? '#0a1e30' : '#e0f0ff',
              color: '#0099ff', border: '1px solid #0099ff',
              borderRadius: '8px', padding: '7px 14px',
              cursor: 'pointer', fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: '0.8rem', flexShrink: 0,
            }}>
            Enable
          </button>
        </div>
      </div>

      {/* Account Management */}
      <div style={cardStyle}>
        {sectionTitle('⚙️', 'Account Management')}
        <label style={labelStyle}>Language</label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          style={{ ...inputStyle, marginBottom: '16px', cursor: 'pointer' }}
        >
          {['English', 'Urdu', 'Arabic', 'French', 'Spanish'].map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <label style={labelStyle}>Primary Time Zone</label>
        <select
          value={timezone}
          onChange={e => setTimezone(e.target.value)}
          style={{ ...inputStyle, marginBottom: '16px', cursor: 'pointer' }}
        >
          {[
            'PKT (UTC+5)',
            'GMT (UTC+0)',
            'EST (UTC-5)',
            'PST (UTC-8)',
            'IST (UTC+5:30)',
            'GST (UTC+4)',
          ].map(tz => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>

        <label style={labelStyle}>Your Email</label>
        <input
          value={email} readOnly
          style={{ ...inputStyle, opacity: 0.7, cursor: 'not-allowed' }}
        />
      </div>
    </div>
  );
}

export default SettingsPage;
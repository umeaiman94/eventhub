import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfilePage({ user, setUser, userEmail, setUserEmail, theme }) {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const [name, setName] = useState(user || '');
  const [email, setEmail] = useState(userEmail || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      alert('Please fill all fields.'); return;
    }
    setUser(name);
    setUserEmail(email);
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate('/'); }, 1500);
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    background: dark ? '#080d14' : '#f8faff',
    border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
    color: dark ? '#fff' : '#0a1628', fontSize: '0.9rem',
    outline: 'none', fontFamily: "'Syne', sans-serif",
    boxSizing: 'border-box', marginBottom: '16px',
  };

  const labelStyle = {
    color: dark ? '#aaa' : '#555', fontSize: '0.85rem',
    fontFamily: "'Syne', sans-serif",
    display: 'block', marginBottom: '6px',
  };

  return (
    <div style={{
      minHeight: '80vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 420, width: '100%' }}>

        <button onClick={() => navigate('/')} style={{
          background: 'transparent', color: dark ? '#888' : '#555',
          border: `1px solid ${dark ? '#333' : '#ddd'}`,
          borderRadius: '8px', padding: '8px 14px', cursor: 'pointer',
          fontFamily: "'Syne', sans-serif", marginBottom: '24px',
        }}>← Back</button>

        <h1 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900, fontSize: '2rem', marginBottom: '8px',
        }}>Edit Profile</h1>
        <p style={{
          color: dark ? '#888' : '#666', marginBottom: '28px',
        }}>Update your name and email address.</p>

        <div style={{
          background: dark ? '#0d1a28' : '#ffffff',
          border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
          borderRadius: '20px', padding: '32px',
        }}>
          {/* Avatar */}
          <div style={{
            width: 70, height: 70, borderRadius: '50%',
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: '1.8rem',
            margin: '0 auto 24px',
            boxShadow: '0 0 24px rgba(0,153,255,0.3)',
          }}>{user ? user[0].toUpperCase() : 'U'}</div>

          <label style={labelStyle}>Full Name</label>
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="Your name" style={inputStyle}
          />

          <label style={labelStyle}>Email</label>
          <input
            value={email} onChange={e => setEmail(e.target.value)}
            type="email" placeholder="your@email.com" style={inputStyle}
          />

          <button onClick={handleSave} style={{
            width: '100%',
            background: saved
              ? 'linear-gradient(135deg, #00c896, #00e5ff)'
              : 'linear-gradient(135deg, #0099ff, #00e5ff)',
            color: '#fff', border: 'none', borderRadius: '12px',
            padding: '14px', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '1rem',
            transition: 'background 0.3s ease',
          }}>
            {saved ? '✅ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage({ setUser, setUserEmail, theme }) {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignup = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Please fill all fields.'); return;
    }
    if (password !== confirm) {
      alert('Passwords do not match.'); return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters.'); return;
    }
    setUser(name);
    setUserEmail(email);
    navigate('/');
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
      alignItems: 'center', justifyContent: 'center',
      padding: '0 2rem',
    }}>
      <div style={{ maxWidth: 420, width: '100%' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '16px',
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: 900, color: '#fff',
            margin: '0 auto 12px',
            boxShadow: '0 0 30px rgba(0,153,255,0.3)',
          }}>E</div>
          <h2 style={{
            color: dark ? '#fff' : '#0a1628',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900, fontSize: '1.8rem', marginBottom: '6px',
          }}>Create Account</h2>
          <p style={{ color: dark ? '#888' : '#666', fontSize: '0.9rem' }}>
            Join EventHub for free today
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: dark ? '#0d1a28' : '#ffffff',
          border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
          borderRadius: '20px', padding: '32px',
          boxShadow: dark
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(0,0,0,0.08)',
        }}>
          <label style={labelStyle}>Full Name</label>
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="Aiman" style={inputStyle}
          />

          <label style={labelStyle}>Email</label>
          <input
            value={email} onChange={e => setEmail(e.target.value)}
            type="email" placeholder="aiman@email.com" style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <input
            value={password} onChange={e => setPassword(e.target.value)}
            type="password" placeholder="Min 6 characters" style={inputStyle}
          />

          <label style={labelStyle}>Confirm Password</label>
          <input
            value={confirm} onChange={e => setConfirm(e.target.value)}
            type="password" placeholder="Repeat password" style={inputStyle}
          />

          <button onClick={handleSignup} style={{
            width: '100%',
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            color: '#fff', border: 'none', borderRadius: '12px',
            padding: '14px', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '1rem', marginBottom: '12px',
          }}>Create Account →</button>

          <p style={{
            textAlign: 'center', color: dark ? '#888' : '#666',
            fontSize: '0.85rem',
          }}>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{ color: '#0099ff', cursor: 'pointer', fontWeight: 700 }}
            >Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
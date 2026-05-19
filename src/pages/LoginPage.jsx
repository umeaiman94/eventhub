import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import PasswordInput from '../components/PasswordInput';
function LoginPage({ setUser, setUserEmail, theme }) {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill all fields.'); return;
    }
    try {
      setLoading(true);
      setError('');
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user.name);
      setUserEmail(res.data.user.email);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
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
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '16px',
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '28px',
            fontWeight: 900, color: '#fff',
            margin: '0 auto 12px',
            boxShadow: '0 0 30px rgba(0,153,255,0.3)',
          }}>E</div>
          <h2 style={{
            color: dark ? '#fff' : '#0a1628',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900, fontSize: '1.8rem', marginBottom: '6px',
          }}>Welcome Back</h2>
          <p style={{ color: dark ? '#888' : '#666', fontSize: '0.9rem' }}>
            Login to unlock all features
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

          {/* Features List */}
          <div style={{
            background: dark ? '#080d14' : '#f0f8ff',
            border: `1px solid ${dark ? '#0f2e4e' : '#d0e8ff'}`,
            borderRadius: '12px', padding: '14px 16px',
            marginBottom: '24px',
          }}>
            {[
              '🎟️ Register for events instantly',
              '📋 Track all your registrations',
              '🚀 Host and manage your own events',
            ].map((item, i) => (
              <p key={i} style={{
                color: dark ? '#aaa' : '#555',
                fontSize: '0.83rem', margin: '4px 0',
                fontFamily: "'Syne', sans-serif",
              }}>{item}</p>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#2a0a0a', border: '1px solid #ff4d4d',
              borderRadius: '10px', padding: '10px 14px',
              color: '#ff4d4d', fontSize: '0.85rem',
              fontFamily: "'Syne', sans-serif", marginBottom: '16px',
            }}>{error}</div>
          )}

          <label style={labelStyle}>Email</label>
          <input
            value={email} onChange={e => setEmail(e.target.value)}
            type="email" placeholder="aiman@email.com"
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
<PasswordInput
  value={password}
  onChange={e => setPassword(e.target.value)}
  placeholder="Your password"
  style={inputStyle}
/>

          <button onClick={handleLogin} disabled={loading} style={{
            width: '100%',
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            color: '#fff', border: 'none', borderRadius: '12px',
            padding: '14px', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '1rem', marginBottom: '16px',
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>

          <p style={{
            textAlign: 'center', color: dark ? '#888' : '#666',
            fontSize: '0.85rem', marginBottom: '12px',
          }}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')} style={{
              color: '#0099ff', cursor: 'pointer', fontWeight: 700,
            }}>Sign Up</span>
          </p>

          <button onClick={() => navigate('/')} style={{
            width: '100%', background: 'transparent',
            color: dark ? '#888' : '#666', border: 'none',
            cursor: 'pointer', fontFamily: "'Syne', sans-serif",
            fontSize: '0.85rem',
          }}>Back to Events</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
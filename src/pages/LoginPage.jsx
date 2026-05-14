import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (!name.trim() || !email.trim()) {
      alert('Please enter both name and email.');
      return;
    }
    setUser(name);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: '0 2rem' }}>
      <div style={{
        background: '#111118', border: '1px solid #1e1e2e',
        borderRadius: '20px', padding: '36px',
      }}>

        {/* Header */}
        <h2 style={{
          color: '#fff', fontFamily: "'Syne', sans-serif",
          fontWeight: 900, fontSize: '1.8rem', marginBottom: '8px',
        }}>Welcome Back</h2>
        <p style={{ color: '#888', marginBottom: '28px', fontSize: '0.9rem' }}>
          Enter your details to continue
        </p>

        {/* Name Field */}
        <label style={{
          color: '#aaa', fontSize: '0.85rem',
          fontFamily: "'Syne', sans-serif",
          display: 'block', marginBottom: '6px',
        }}>Your Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Aiman"
          style={{
            width: '100%', padding: '12px 14px', borderRadius: '10px',
            background: '#0a0a0f', border: '1px solid #2a2a3e',
            color: '#fff', fontSize: '0.9rem', outline: 'none',
            fontFamily: "'Syne', sans-serif", boxSizing: 'border-box',
            marginBottom: '16px',
          }}
        />

        {/* Email Field */}
        <label style={{
          color: '#aaa', fontSize: '0.85rem',
          fontFamily: "'Syne', sans-serif",
          display: 'block', marginBottom: '6px',
        }}>Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="aiman@email.com"
          style={{
            width: '100%', padding: '12px 14px', borderRadius: '10px',
            background: '#0a0a0f', border: '1px solid #2a2a3e',
            color: '#fff', fontSize: '0.9rem', outline: 'none',
            fontFamily: "'Syne', sans-serif", boxSizing: 'border-box',
            marginBottom: '24px',
          }}
        />

        {/* Login Button */}
        <button onClick={handleLogin} style={{
          width: '100%',
          background: 'linear-gradient(135deg, #6c63ff, #e040fb)',
          color: '#fff', border: 'none', borderRadius: '12px',
          padding: '14px', cursor: 'pointer',
          fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem',
          marginBottom: '12px',
        }}>
          Continue →
        </button>

        {/* Back Button */}
        <button onClick={() => navigate('/')} style={{
          width: '100%', background: 'transparent', color: '#888',
          border: 'none', cursor: 'pointer',
          fontFamily: "'Syne', sans-serif", fontSize: '0.85rem',
        }}>
          Back to Events
        </button>

      </div>
    </div>
  );
}

export default LoginPage;
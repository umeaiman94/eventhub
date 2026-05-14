import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const messages = [
  "👋 Login to unlock more features!",
  "🎟️ Register for events with one click!",
  "📋 Track all your registrations easily!",
  "🚀 Host your own events after logging in!",
  "✨ Join thousands of event lovers today!",
];

function LoginNudge({ onClose, theme }) {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  // Fade in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Rotate messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 8000,
      maxWidth: 320,
      width: '100%',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.4s ease, transform 0.4s ease',
    }}>
      <div style={{
        background: dark ? '#0d1a28' : '#ffffff',
        border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
        borderRadius: '16px',
        padding: '20px',
        boxShadow: dark
          ? '0 8px 32px rgba(0,153,255,0.15)'
          : '0 8px 32px rgba(0,0,0,0.1)',
      }}>

        {/* Top Row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'start', marginBottom: '12px',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '12px',
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '20px',
            boxShadow: '0 0 16px rgba(0,153,255,0.3)',
          }}>E</div>

          <button onClick={onClose} style={{
            background: 'transparent',
            color: dark ? '#555' : '#aaa',
            border: 'none', cursor: 'pointer',
            fontSize: '1.1rem', lineHeight: 1,
            padding: '2px 6px',
          }}>✕</button>
        </div>

        {/* Rotating Message */}
        <p style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700, fontSize: '0.95rem',
          marginBottom: '6px',
          minHeight: '24px',
          transition: 'opacity 0.3s ease',
        }}>{messages[msgIndex]}</p>

        <p style={{
          color: dark ? '#888' : '#666',
          fontSize: '0.8rem', marginBottom: '16px', lineHeight: 1.5,
        }}>
          Create a free account and get the most out of EventHub.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleLogin} style={{
            flex: 1,
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            color: '#fff', border: 'none', borderRadius: '10px',
            padding: '10px', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            fontSize: '0.85rem',
          }}>
            Login Now
          </button>
          <button onClick={onClose} style={{
            flex: 1,
            background: 'transparent',
            color: dark ? '#888' : '#666',
            border: `1px solid ${dark ? '#1e2e3e' : '#e0e0f0'}`,
            borderRadius: '10px', padding: '10px', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif", fontSize: '0.85rem',
          }}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginNudge;
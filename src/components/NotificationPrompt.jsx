import React, { useState } from 'react';

function NotificationPrompt({ onClose, theme }) {
  const [asking, setAsking] = useState(false);
  const dark = theme === 'dark';

  const handleAllow = () => {
    setAsking(true);
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('EventHub 🎉', {
            body: 'You will now get notified about new events!',
            icon: '/favicon.ico',
          });
        }
        onClose();
      });
    } else {
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 9000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 1rem',
    }}>
      <div style={{
        background: dark ? '#0d1a28' : '#ffffff',
        border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
        borderRadius: '20px',
        padding: '32px',
        maxWidth: 420, width: '100%',
        textAlign: 'center',
        animation: 'popIn 0.4s ease',
      }}>

        {/* Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: '18px',
          background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', margin: '0 auto 20px',
          boxShadow: '0 0 30px rgba(0,153,255,0.3)',
        }}>🔔</div>

        <h2 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900, fontSize: '1.4rem', marginBottom: '10px',
        }}>Stay in the Loop!</h2>

        <p style={{
          color: dark ? '#888' : '#666',
          fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px',
        }}>
          Allow EventHub to send you notifications so you never miss
          an upcoming event or registration deadline.
        </p>

        {/* Buttons */}
        <button onClick={handleAllow} disabled={asking} style={{
          width: '100%',
          background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
          color: '#fff', border: 'none', borderRadius: '12px',
          padding: '13px', cursor: 'pointer',
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: '1rem', marginBottom: '10px',
          opacity: asking ? 0.7 : 1,
        }}>
          {asking ? 'Requesting...' : '🔔 Allow Notifications'}
        </button>

        <button onClick={onClose} style={{
          width: '100%', background: 'transparent',
          color: dark ? '#888' : '#666',
          border: `1px solid ${dark ? '#1e2e3e' : '#e0e0f0'}`,
          borderRadius: '12px', padding: '12px', cursor: 'pointer',
          fontFamily: "'Syne', sans-serif", fontSize: '0.9rem',
        }}>
          Maybe Later
        </button>

        <style>{`
          @keyframes popIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default NotificationPrompt;
import React, { useEffect, useState } from 'react';

function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2000);
    const timer2 = setTimeout(() => onFinish(), 2800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0a0a0f',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.8s ease',
    }}>

      {/* Glow Effect */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{
        width: 80, height: 80, borderRadius: '22px',
        background: 'linear-gradient(135deg, #6c63ff, #e040fb)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '40px', fontWeight: 900, color: '#fff',
        marginBottom: '20px',
        boxShadow: '0 0 40px rgba(108, 99, 255, 0.5)',
        animation: 'popIn 0.5s ease forwards',
      }}>E</div>

      {/* Name */}
      <h1 style={{
        color: '#fff', fontFamily: "'Syne', sans-serif",
        fontWeight: 900, fontSize: '2.5rem', letterSpacing: '-1px',
        animation: 'fadeUp 0.6s ease 0.3s forwards',
        opacity: 0,
      }}>
        Event<span style={{
          background: 'linear-gradient(90deg, #6c63ff, #e040fb)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>Hub</span>
      </h1>

      {/* Tagline */}
      <p style={{
        color: '#555', fontFamily: "'Syne', sans-serif",
        fontSize: '0.9rem', marginTop: '10px', letterSpacing: '2px',
        animation: 'fadeUp 0.6s ease 0.5s forwards',
        opacity: 0,
      }}>DISCOVER · ATTEND · HOST</p>

      {/* Loading Bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '3px', width: '100%',
        background: '#1e1e2e',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #6c63ff, #e040fb)',
          animation: 'loadBar 2s ease forwards',
        }} />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes loadBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

    </div>
  );
}

export default SplashScreen;
import React from 'react';

function EventCard({ event, onClick, theme }) {
  const spotsLeft = event.seats - event.registered;
  const percentage = Math.round((event.registered / event.seats) * 100);
  const dark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = '#0099ff';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = dark ? '#0f1e2e' : '#e0e0f0';
      }}
      style={{
        background: dark ? '#0d1a28' : '#ffffff',
        border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s, border-color 0.2s',
      }}
    >
      {/* Banner Image */}
      <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
        <img
          src={event.banner}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <span style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(8,13,20,0.85)',
          backdropFilter: 'blur(8px)',
          color: '#fff', fontSize: '0.72rem', fontWeight: 700,
          padding: '4px 10px', borderRadius: '20px',
          fontFamily: "'Syne', sans-serif", letterSpacing: '1px',
        }}>{event.category}</span>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px' }}>
        <h3 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: '1rem', margin: '0 0 6px',
        }}>{event.title}</h3>

        <p style={{
          color: dark ? '#888' : '#666',
          fontSize: '0.8rem', margin: '0 0 4px',
        }}>📅 {event.date} at {event.time}</p>

        <p style={{
          color: dark ? '#888' : '#666',
          fontSize: '0.8rem', margin: '0 0 12px',
        }}>📍 {event.location}</p>

        {/* Progress Bar */}
        <div style={{
          background: dark ? '#0a1628' : '#e8f4ff',
          borderRadius: '6px', height: 6, marginBottom: 6,
        }}>
          <div style={{
            width: `${percentage}%`, height: '100%',
            borderRadius: '6px',
            background: 'linear-gradient(90deg, #0099ff, #00e5ff)',
          }} />
        </div>

        <p style={{
          color: spotsLeft < 20 ? '#00e5ff' : dark ? '#888' : '#666',
          fontSize: '0.75rem',
        }}>
          {spotsLeft} spots left of {event.seats}
        </p>
      </div>
    </div>
  );
}

export default EventCard;
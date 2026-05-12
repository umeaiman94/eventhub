import React from 'react';

function EventCard({ event, onClick }) {
  const spotsLeft = event.seats - event.registered;
  const percentage = Math.round((event.registered / event.seats) * 100);

  return (
    <div
      onClick={onClick}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = '#6c63ff';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#1e1e2e';
      }}
      style={{
        background: '#111118',
        border: '1px solid #1e1e2e',
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
          background: 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(8px)',
          color: '#fff', fontSize: '0.72rem', fontWeight: 700,
          padding: '4px 10px', borderRadius: '20px',
          fontFamily: "'Syne', sans-serif", letterSpacing: '1px',
        }}>{event.category}</span>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px' }}>
        <h3 style={{
          color: '#fff', fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: '1rem', margin: '0 0 6px',
        }}>{event.title}</h3>

        <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 4px' }}>
          📅 {event.date} at {event.time}
        </p>
        <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 12px' }}>
          📍 {event.location}
        </p>

        {/* Progress Bar */}
        <div style={{
          background: '#1a1a2e', borderRadius: '6px',
          height: 6, marginBottom: 6,
        }}>
          <div style={{
            width: `${percentage}%`, height: '100%',
            borderRadius: '6px',
            background: 'linear-gradient(90deg, #6c63ff, #e040fb)',
          }} />
        </div>

        <p style={{ color: spotsLeft < 20 ? '#e040fb' : '#888', fontSize: '0.75rem' }}>
          {spotsLeft} spots left of {event.seats}
        </p>
      </div>
    </div>
  );
}

export default EventCard;
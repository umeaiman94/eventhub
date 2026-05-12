import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EventDetailPage({ events, user, registrations, setRegistrations }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === parseInt(id));
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const alreadyRegistered = registrations.some(r => r.eventId === event.id);

  if (!event) return (
    <div style={{ textAlign: 'center', padding: '80px 2rem', color: '#888', fontFamily: "'Syne', sans-serif" }}>
      Event not found.
    </div>
  );

  const handleSubmit = () => {
    if (!user) { navigate('/login'); return; }
    const allFilled = event.formFields.every(field => formData[field]?.trim());
    if (!allFilled) { alert('Please fill all fields.'); return; }
    setRegistrations(prev => [...prev, {
      eventId: event.id,
      eventTitle: event.title,
      data: formData,
      date: new Date().toLocaleDateString(),
    }]);
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 2rem' }}>

      {/* Back Button */}
      <button onClick={() => navigate('/')} style={{
        background: 'transparent', color: '#888',
        border: '1px solid #333', borderRadius: '8px',
        padding: '8px 14px', cursor: 'pointer',
        fontFamily: "'Syne', sans-serif", marginBottom: '24px',
      }}>← Back</button>

      {/* Banner */}
      <img
        src={event.banner} alt={event.title}
        style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '16px', marginBottom: '24px' }}
      />

      {/* Category Badge */}
      <span style={{
        background: '#1a1a2e', color: '#6c63ff',
        padding: '4px 12px', borderRadius: '20px',
        fontSize: '0.8rem', fontFamily: "'Syne', sans-serif",
        fontWeight: 700, display: 'inline-block', marginBottom: '12px',
      }}>{event.category}</span>

      {/* Event Info */}
      <h1 style={{
        color: '#fff', fontFamily: "'Syne', sans-serif",
        fontWeight: 900, fontSize: '2rem', margin: '0 0 12px',
      }}>{event.title}</h1>

      <p style={{ color: '#888', marginBottom: '8px' }}>
        🏢 Organized by <strong style={{ color: '#ccc' }}>{event.organizer}</strong>
      </p>
      <p style={{ color: '#888', marginBottom: '4px' }}>📅 {event.date} at {event.time}</p>
      <p style={{ color: '#888', marginBottom: '20px' }}>📍 {event.location}</p>
      <p style={{ color: '#bbb', lineHeight: 1.7, marginBottom: '32px' }}>{event.description}</p>

      {/* Registration Form */}
      <div style={{
        background: '#111118', border: '1px solid #1e1e2e',
        borderRadius: '16px', padding: '24px',
      }}>
        <h2 style={{
          color: '#fff', fontFamily: "'Syne', sans-serif",
          fontWeight: 800, marginBottom: '20px',
        }}>
          {submitted || alreadyRegistered ? '✅ You are Registered!' : 'Register for this Event'}
        </h2>

        {submitted || alreadyRegistered ? (
          <p style={{ color: '#888' }}>
            Your registration has been recorded. See you at the event!
          </p>
        ) : (
          <>
            {event.formFields.map(field => (
              <div key={field} style={{ marginBottom: '16px' }}>
                <label style={{
                  color: '#aaa', fontSize: '0.85rem',
                  fontFamily: "'Syne', sans-serif",
                  display: 'block', marginBottom: '6px',
                }}>{field}</label>
                <input
                  value={formData[field] || ''}
                  onChange={e => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                  style={{
                    width: '100%', padding: '12px 14px',
                    borderRadius: '10px', background: '#0a0a0f',
                    border: '1px solid #2a2a3e', color: '#fff',
                    fontSize: '0.9rem', outline: 'none',
                    fontFamily: "'Syne', sans-serif", boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}
            <button onClick={handleSubmit} style={{
              background: 'linear-gradient(135deg, #6c63ff, #e040fb)',
              color: '#fff', border: 'none', borderRadius: '10px',
              padding: '13px 28px', cursor: 'pointer',
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: '1rem', marginTop: '8px',
            }}>
              {user ? 'Submit Registration' : 'Login to Register'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EventDetailPage;
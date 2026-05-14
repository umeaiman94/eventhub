import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EventDetailPage({ events, user, registrations, setRegistrations, theme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const event = events.find(e => e.id === parseInt(id));
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const alreadyRegistered = registrations.some(r => r.eventId === event?.id);

  if (!event) return (
    <div style={{
      textAlign: 'center', padding: '80px 2rem',
      color: dark ? '#888' : '#666',
      fontFamily: "'Syne', sans-serif",
    }}>
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

  const inputStyle = {
    width: '100%', padding: '12px 14px',
    borderRadius: '10px',
    background: dark ? '#080d14' : '#f8faff',
    border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
    color: dark ? '#fff' : '#0a1628',
    fontSize: '0.9rem', outline: 'none',
    fontFamily: "'Syne', sans-serif",
    boxSizing: 'border-box',
    transition: 'background 0.3s ease',
  };

  const labelStyle = {
    color: dark ? '#aaa' : '#555',
    fontSize: '0.85rem',
    fontFamily: "'Syne', sans-serif",
    display: 'block', marginBottom: '6px',
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 2rem' }}>

      {/* Back Button */}
      <button onClick={() => navigate('/')} style={{
        background: 'transparent',
        color: dark ? '#888' : '#555',
        border: `1px solid ${dark ? '#333' : '#ddd'}`,
        borderRadius: '8px', padding: '8px 14px',
        cursor: 'pointer', fontFamily: "'Syne', sans-serif",
        marginBottom: '24px',
      }}>← Back</button>

      {/* Banner */}
      <img
        src={event.banner} alt={event.title}
        style={{
          width: '100%', height: 280,
          objectFit: 'cover', borderRadius: '16px',
          marginBottom: '24px',
        }}
      />

      {/* Category Badge */}
      <span style={{
        background: dark ? '#0a1e30' : '#e0f0ff',
        color: '#0099ff', padding: '4px 12px',
        borderRadius: '20px', fontSize: '0.8rem',
        fontFamily: "'Syne', sans-serif", fontWeight: 700,
        display: 'inline-block', marginBottom: '12px',
      }}>{event.category}</span>

      {/* Title */}
      <h1 style={{
        color: dark ? '#fff' : '#0a1628',
        fontFamily: "'Syne', sans-serif",
        fontWeight: 900, fontSize: '2rem', margin: '0 0 12px',
      }}>{event.title}</h1>

      {/* Meta Info */}
      <p style={{ color: dark ? '#888' : '#666', marginBottom: '8px' }}>
        🏢 Organized by{' '}
        <strong style={{ color: dark ? '#ccc' : '#333' }}>
          {event.organizer}
        </strong>
      </p>
      <p style={{ color: dark ? '#888' : '#666', marginBottom: '4px' }}>
        📅 {event.date} at {event.time}
      </p>
      <p style={{ color: dark ? '#888' : '#666', marginBottom: '20px' }}>
        📍 {event.location}
      </p>
      <p style={{
        color: dark ? '#bbb' : '#444',
        lineHeight: 1.7, marginBottom: '32px',
      }}>{event.description}</p>

      {/* Registration Form */}
      <div style={{
        background: dark ? '#0d1a28' : '#ffffff',
        border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
        borderRadius: '16px', padding: '24px',
      }}>
        <h2 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, marginBottom: '20px',
        }}>
          {submitted || alreadyRegistered
            ? '✅ You are Registered!'
            : 'Register for this Event'}
        </h2>

        {submitted || alreadyRegistered ? (
          <p style={{ color: dark ? '#888' : '#666' }}>
            Your registration has been recorded. See you at the event!
          </p>
        ) : (
          <>
            {event.formFields.map(field => (
              <div key={field} style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>{field}</label>
                <input
                  value={formData[field] || ''}
                  onChange={e => setFormData(prev => ({
                    ...prev, [field]: e.target.value,
                  }))}
                  style={inputStyle}
                />
              </div>
            ))}
            <button onClick={handleSubmit} style={{
              background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
              color: '#fff', border: 'none', borderRadius: '10px',
              padding: '13px 28px', cursor: 'pointer',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: '1rem', marginTop: '8px',
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
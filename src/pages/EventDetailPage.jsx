import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const EVENT_COORDS = {
  1: [24.8607, 67.0011],
  2: [31.5204, 74.3587],
  3: [33.6844, 73.0479],
};

function EventDetailPage({ events, user, registrations, setRegistrations, theme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const event = events.find(e => e.id === parseInt(id));
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [shareMsg, setShareMsg] = useState('');

  const alreadyRegistered = registrations.some(r => r.eventId === event?.id);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShareMsg('Link copied!');
      setTimeout(() => setShareMsg(''), 2000);
    }
  };

  const handleDownloadTicket = () => {
    const ticket = `
============================
       EVENTHUB TICKET
============================
Event : ${event.title}
Date  : ${event.date} at ${event.time}
Venue : ${event.location}
Name  : ${Object.values(formData)[0] || 'Attendee'}
============================
    Thank you for registering!
============================
    `;
    const blob = new Blob([ticket], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${event.title}-ticket.txt`;
    a.click();
  };

  if (!event) return (
    <div style={{
      textAlign: 'center', padding: '80px 2rem',
      color: dark ? '#888' : '#666',
      fontFamily: "'Syne', sans-serif",
    }}>Event not found.</div>
  );

  const handleSubmit = () => {
    if (!user) { navigate('/login'); return; }
    const allFilled = event.formFields.every(f => formData[f]?.trim());
    if (!allFilled) { alert('Please fill all fields.'); return; }
    setRegistrations(prev => [...prev, {
      eventId: event.id, eventTitle: event.title,
      data: formData, date: new Date().toLocaleDateString(),
    }]);
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    background: dark ? '#080d14' : '#f8faff',
    border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
    color: dark ? '#fff' : '#0a1628', fontSize: '0.9rem',
    outline: 'none', fontFamily: "'Syne', sans-serif",
    boxSizing: 'border-box',
  };

  const coords = EVENT_COORDS[event.id] || [33.6844, 73.0479];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 2rem' }}>

      {/* Back Button */}
      <button onClick={() => navigate('/')} style={{
        background: 'transparent', color: dark ? '#888' : '#555',
        border: `1px solid ${dark ? '#333' : '#ddd'}`,
        borderRadius: '8px', padding: '8px 14px', cursor: 'pointer',
        fontFamily: "'Syne', sans-serif", marginBottom: '24px',
      }}>← Back</button>

      {/* Banner */}
      <img src={event.banner} alt={event.title} style={{
        width: '100%', height: 280, objectFit: 'cover',
        borderRadius: '16px', marginBottom: '24px',
      }} />

      {/* Category + Share Row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '12px',
        flexWrap: 'wrap', gap: '10px',
      }}>
        <span style={{
          background: dark ? '#0a1e30' : '#e0f0ff',
          color: '#0099ff', padding: '4px 12px',
          borderRadius: '20px', fontSize: '0.8rem',
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
        }}>{event.category}</span>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {shareMsg && (
            <span style={{
              color: '#0099ff', fontSize: '0.8rem',
              fontFamily: "'Syne', sans-serif",
            }}>{shareMsg}</span>
          )}
          <button onClick={handleShare} style={{
            background: dark ? '#0a1e30' : '#e0f0ff',
            color: '#0099ff', border: '1px solid #0099ff',
            borderRadius: '8px', padding: '6px 14px',
            cursor: 'pointer', fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '0.82rem',
          }}>🔗 Share</button>
          <button onClick={() => setShowMap(prev => !prev)} style={{
            background: dark ? '#0a1e30' : '#e0f0ff',
            color: '#0099ff', border: '1px solid #0099ff',
            borderRadius: '8px', padding: '6px 14px',
            cursor: 'pointer', fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '0.82rem',
          }}>🗺️ {showMap ? 'Hide Map' : 'View Map'}</button>
        </div>
      </div>

      {/* Map */}
      {showMap && (
        <div style={{
          height: 300, borderRadius: '16px',
          overflow: 'hidden', marginBottom: '24px',
          border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
        }}>
          <MapContainer
            center={coords} zoom={13}
            style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={coords}>
              <Popup>{event.title} — {event.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      {/* Event Info */}
      <h1 style={{
        color: dark ? '#fff' : '#0a1628',
        fontFamily: "'Syne', sans-serif",
        fontWeight: 900, fontSize: '2rem', margin: '0 0 12px',
      }}>{event.title}</h1>
      <p style={{ color: dark ? '#888' : '#666', marginBottom: '8px' }}>
        🏢 Organized by <strong style={{ color: dark ? '#ccc' : '#333' }}>{event.organizer}</strong>
      </p>
      <p style={{ color: dark ? '#888' : '#666', marginBottom: '4px' }}>📅 {event.date} at {event.time}</p>
      <p style={{ color: dark ? '#888' : '#666', marginBottom: '20px' }}>📍 {event.location}</p>
      <p style={{ color: dark ? '#bbb' : '#444', lineHeight: 1.7, marginBottom: '32px' }}>
        {event.description}
      </p>

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
          {submitted || alreadyRegistered ? '✅ You are Registered!' : 'Register for this Event'}
        </h2>

        {submitted || alreadyRegistered ? (
          <div>
            <p style={{ color: dark ? '#888' : '#666', marginBottom: '16px' }}>
              Your registration has been recorded. See you at the event!
            </p>
            <button onClick={handleDownloadTicket} style={{
              background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
              color: '#fff', border: 'none', borderRadius: '10px',
              padding: '12px 24px', cursor: 'pointer',
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: '0.95rem',
            }}>🎟️ Download Ticket</button>
          </div>
        ) : (
          <>
            {event.formFields.map(field => (
              <div key={field} style={{ marginBottom: '16px' }}>
                <label style={{
                  color: dark ? '#aaa' : '#555', fontSize: '0.85rem',
                  fontFamily: "'Syne', sans-serif",
                  display: 'block', marginBottom: '6px',
                }}>{field}</label>
                <input
                  value={formData[field] || ''}
                  onChange={e => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
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
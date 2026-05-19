import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api';

const CATEGORIES = ["Technology", "Design", "Business", "Health", "Education", "Sports"];

function CreateEventPage({ setEvents, user, theme, userRole, organizerVerified }) {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newField, setNewField] = useState('');
  const [formFields, setFormFields] = useState(['Full Name', 'Email']);
  const [form, setForm] = useState({
    title: '', organizer: '', date: '', time: '',
    location: '', category: 'Technology',
    description: '', seats: '', banner: '',
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleAddField = () => {
    if (newField.trim()) {
      setFormFields(prev => [...prev, newField.trim()]);
      setNewField('');
    }
  };

  const handleRemoveField = (index) => {
    setFormFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreate = async () => {
    if (userRole !== 'organizer') {
      setError('Only organizers can create events.'); return;
    }
    if (!organizerVerified) {
      setError('Your organizer account is pending verification.'); return;
    }
    if (!form.title || !form.date || !form.location) {
      setError('Please fill Title, Date and Location.'); return;
    }
    try {
      setLoading(true);
      setError('');
      const eventData = {
        ...form,
        seats: parseInt(form.seats) || 100,
        formFields,
        banner: form.banner ||
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      };
      const res = await createEvent(eventData);
      setEvents(prev => [res.data, ...prev]);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event.');
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
    transition: 'background 0.3s ease',
  };

  const labelStyle = {
    color: dark ? '#aaa' : '#555', fontSize: '0.85rem',
    fontFamily: "'Syne', sans-serif",
    display: 'block', marginBottom: '6px',
  };

  if (success) return (
    <div style={{
      maxWidth: 600, margin: '80px auto',
      textAlign: 'center', padding: '0 2rem',
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
      <h2 style={{
        color: dark ? '#fff' : '#0a1628',
        fontFamily: "'Syne', sans-serif",
        fontWeight: 900, marginBottom: '12px',
      }}>Event Created!</h2>
      <p style={{ color: dark ? '#888' : '#666', marginBottom: '24px' }}>
        Your event is now live on EventHub.
      </p>
      <button onClick={() => navigate('/')} style={{
        background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
        color: '#fff', border: 'none', borderRadius: '10px',
        padding: '13px 28px', cursor: 'pointer',
        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem',
      }}>View All Events</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 2rem' }}>

      <button onClick={() => navigate('/')} style={{
        background: 'transparent', color: dark ? '#888' : '#555',
        border: `1px solid ${dark ? '#333' : '#ddd'}`,
        borderRadius: '8px', padding: '8px 14px', cursor: 'pointer',
        fontFamily: "'Syne', sans-serif", marginBottom: '24px',
      }}>← Back</button>

      <h1 style={{
        color: dark ? '#fff' : '#0a1628',
        fontFamily: "'Syne', sans-serif",
        fontWeight: 900, fontSize: '2rem', marginBottom: '8px',
      }}>Host an Event</h1>
      <p style={{ color: dark ? '#888' : '#666', marginBottom: '24px' }}>
        Fill in the details below to publish your event.
      </p>

      {/* Attendee Block */}
      {userRole === 'attendee' && (
        <div style={{
          background: dark ? '#1a0a0a' : '#fff0f0',
          border: '1px solid #ff4d4d',
          borderRadius: '12px', padding: '20px',
          marginBottom: '24px', textAlign: 'center',
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '10px' }}>🚫</p>
          <p style={{
            color: '#ff4d4d', fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '1rem', marginBottom: '8px',
          }}>Organizer Account Required</p>
          <p style={{
            color: dark ? '#aaa' : '#666',
            fontSize: '0.85rem', fontFamily: "'Syne', sans-serif",
            marginBottom: '16px',
          }}>
            Only verified organizers can host events on EventHub.
            Create an organizer account to get started.
          </p>
          <button onClick={() => navigate('/signup')} style={{
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            color: '#fff', border: 'none', borderRadius: '10px',
            padding: '10px 24px', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
          }}>Create Organizer Account</button>
        </div>
      )}

      {/* Pending Verification Notice */}
      {userRole === 'organizer' && !organizerVerified && (
        <div style={{
          background: dark ? '#1a1a0a' : '#fffbe0',
          border: '1px solid #ffd700',
          borderRadius: '12px', padding: '20px',
          marginBottom: '24px', textAlign: 'center',
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</p>
          <p style={{
            color: '#ffd700', fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '1rem', marginBottom: '8px',
          }}>Account Pending Verification</p>
          <p style={{
            color: dark ? '#aaa' : '#666',
            fontSize: '0.85rem', fontFamily: "'Syne', sans-serif",
          }}>
            Your organizer account is being reviewed by EventHub admin.
            You will be notified once approved and can start hosting events.
          </p>
        </div>
      )}

      {/* Form - only show for verified organizers */}
      {userRole === 'organizer' && organizerVerified && (
        <>
          {/* Error Message */}
          {error && (
            <div style={{
              background: '#2a0a0a', border: '1px solid #ff4d4d',
              borderRadius: '10px', padding: '10px 14px',
              color: '#ff4d4d', fontSize: '0.85rem',
              fontFamily: "'Syne', sans-serif", marginBottom: '16px',
            }}>{error}</div>
          )}

          <div style={{
            background: dark ? '#0d1a28' : '#ffffff',
            border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
            borderRadius: '16px', padding: '28px',
          }}>
            <label style={labelStyle}>Event Title *</label>
            <input
              value={form.title}
              onChange={e => update('title', e.target.value)}
              placeholder="e.g. Tech Summit 2026"
              style={inputStyle}
            />

            <label style={labelStyle}>Organizer Name *</label>
            <input
              value={form.organizer}
              onChange={e => update('organizer', e.target.value)}
              placeholder="Your name or company"
              style={inputStyle}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Date *</label>
                <input
                  type="date" value={form.date}
                  onChange={e => update('date', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Time</label>
                <input
                  type="time" value={form.time}
                  onChange={e => update('time', e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <label style={labelStyle}>Location *</label>
            <input
              value={form.location}
              onChange={e => update('location', e.target.value)}
              placeholder="Venue name and city"
              style={inputStyle}
            />

            <label style={labelStyle}>Category</label>
            <select
              value={form.category}
              onChange={e => update('category', e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <label style={labelStyle}>Total Seats</label>
            <input
              type="number" value={form.seats}
              onChange={e => update('seats', e.target.value)}
              placeholder="100" style={inputStyle}
            />

            <label style={labelStyle}>Banner Image URL (optional)</label>
            <input
              value={form.banner}
              onChange={e => update('banner', e.target.value)}
              placeholder="https://..." style={inputStyle}
            />

            <label style={labelStyle}>Description</label>
            <textarea
              value={form.description}
              onChange={e => update('description', e.target.value)}
              placeholder="Tell people about your event..."
              style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
            />

            {/* Form Fields Builder */}
            <h3 style={{
              color: dark ? '#fff' : '#0a1628',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, marginBottom: '12px', marginTop: '8px',
            }}>Registration Form Fields</h3>

            <div style={{ marginBottom: '12px' }}>
              {formFields.map((field, index) => (
                <div key={index} style={{
                  display: 'flex', alignItems: 'center',
                  gap: '8px', marginBottom: '8px',
                }}>
                  <span style={{
                    flex: 1, color: dark ? '#ccc' : '#333',
                    background: dark ? '#080d14' : '#f8faff',
                    border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                    borderRadius: '8px', padding: '8px 12px',
                    fontSize: '0.85rem', fontFamily: "'Syne', sans-serif",
                  }}>{field}</span>
                  {index > 1 && (
                    <button onClick={() => handleRemoveField(index)} style={{
                      background: dark ? '#1a0a2e' : '#fff0f5',
                      color: '#0099ff', border: 'none',
                      borderRadius: '6px', padding: '6px 10px',
                      cursor: 'pointer',
                    }}>✕</button>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                value={newField}
                onChange={e => setNewField(e.target.value)}
                placeholder="Add a field (e.g. Phone Number)"
                style={{ ...inputStyle, margin: 0, flex: 1 }}
              />
              <button onClick={handleAddField} style={{
                background: dark ? '#0a1e30' : '#e0f0ff',
                color: '#0099ff', border: '1px solid #0099ff',
                borderRadius: '10px', padding: '12px 16px',
                cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                fontWeight: 700, whiteSpace: 'nowrap',
              }}>+ Add</button>
            </div>

            <button onClick={handleCreate} disabled={loading} style={{
              width: '100%', marginTop: '24px',
              background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '15px', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: '1rem', opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'Publishing...' : '🚀 Publish Event'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateEventPage;
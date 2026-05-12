import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ["Technology", "Design", "Business", "Health", "Education", "Sports"];

function CreateEventPage({ setEvents, user }) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
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

  const handleCreate = () => {
    if (!form.title || !form.date || !form.location) {
      alert('Please fill Title, Date and Location.');
      return;
    }
    const newEvent = {
      id: Date.now(),
      ...form,
      seats: parseInt(form.seats) || 100,
      registered: 0,
      formFields: formFields,
      banner: form.banner ||
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    };
    setEvents(prev => [newEvent, ...prev]);
    setSuccess(true);
  };

  if (success) return (
    <div style={{ maxWidth: 600, margin: '80px auto', textAlign: 'center', padding: '0 2rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
      <h2 style={{
        color: '#fff', fontFamily: "'Syne', sans-serif",
        fontWeight: 900, marginBottom: '12px',
      }}>Event Created!</h2>
      <p style={{ color: '#888', marginBottom: '24px' }}>
        Your event is now live on EventHub.
      </p>
      <button onClick={() => navigate('/')} style={{
        background: 'linear-gradient(135deg, #6c63ff, #e040fb)',
        color: '#fff', border: 'none', borderRadius: '10px',
        padding: '13px 28px', cursor: 'pointer',
        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem',
      }}>View All Events</button>
    </div>
  );

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    background: '#0a0a0f', border: '1px solid #2a2a3e',
    color: '#fff', fontSize: '0.9rem', outline: 'none',
    fontFamily: "'Syne', sans-serif", boxSizing: 'border-box', marginBottom: '16px',
  };

  const labelStyle = {
    color: '#aaa', fontSize: '0.85rem',
    fontFamily: "'Syne', sans-serif",
    display: 'block', marginBottom: '6px',
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 2rem' }}>

      {/* Back Button */}
      <button onClick={() => navigate('/')} style={{
        background: 'transparent', color: '#888',
        border: '1px solid #333', borderRadius: '8px',
        padding: '8px 14px', cursor: 'pointer',
        fontFamily: "'Syne', sans-serif", marginBottom: '24px',
      }}>← Back</button>

      <h1 style={{
        color: '#fff', fontFamily: "'Syne', sans-serif",
        fontWeight: 900, fontSize: '2rem', marginBottom: '8px',
      }}>Host an Event</h1>
      <p style={{ color: '#888', marginBottom: '32px' }}>
        Fill in the details below to publish your event.
      </p>

      <div style={{
        background: '#111118', border: '1px solid #1e1e2e',
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

        {/* Date and Time */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={e => update('date', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Time</label>
            <input
              type="time"
              value={form.time}
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
          type="number"
          value={form.seats}
          onChange={e => update('seats', e.target.value)}
          placeholder="100"
          style={inputStyle}
        />

        <label style={labelStyle}>Banner Image URL (optional)</label>
        <input
          value={form.banner}
          onChange={e => update('banner', e.target.value)}
          placeholder="https://..."
          style={inputStyle}
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
          color: '#fff', fontFamily: "'Syne', sans-serif",
          fontWeight: 800, marginBottom: '12px', marginTop: '8px',
        }}>Registration Form Fields</h3>

        <div style={{ marginBottom: '12px' }}>
          {formFields.map((field, index) => (
            <div key={index} style={{
              display: 'flex', alignItems: 'center',
              gap: '8px', marginBottom: '8px',
            }}>
              <span style={{
                flex: 1, color: '#ccc', background: '#0a0a0f',
                border: '1px solid #2a2a3e', borderRadius: '8px',
                padding: '8px 12px', fontSize: '0.85rem',
                fontFamily: "'Syne', sans-serif",
              }}>{field}</span>
              {index > 1 && (
                <button
                  onClick={() => handleRemoveField(index)}
                  style={{
                    background: '#2a1a2e', color: '#e040fb',
                    border: 'none', borderRadius: '6px',
                    padding: '6px 10px', cursor: 'pointer',
                  }}>✕</button>
              )}
            </div>
          ))}
        </div>

        {/* Add New Field */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={newField}
            onChange={e => setNewField(e.target.value)}
            placeholder="Add a field (e.g. Phone Number)"
            style={{ ...inputStyle, margin: 0, flex: 1 }}
          />
          <button onClick={handleAddField} style={{
            background: '#1a1a2e', color: '#6c63ff',
            border: '1px solid #6c63ff', borderRadius: '10px',
            padding: '12px 16px', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
            whiteSpace: 'nowrap',
          }}>+ Add</button>
        </div>

        {/* Submit Button */}
        <button onClick={handleCreate} style={{
          width: '100%', marginTop: '24px',
          background: 'linear-gradient(135deg, #6c63ff, #e040fb)',
          color: '#fff', border: 'none', borderRadius: '12px',
          padding: '15px', cursor: 'pointer',
          fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem',
        }}>
          🚀 Publish Event
        </button>
      </div>
    </div>
  );
}

export default CreateEventPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';

const CATEGORIES = [
  { name: 'Technology', icon: '💻', description: 'AI, cloud, software and innovation events' },
  { name: 'Design', icon: '🎨', description: 'UI/UX, branding, and creative expos' },
  { name: 'Business', icon: '💼', description: 'Startups, pitch nights, and networking' },
  { name: 'Health', icon: '🏥', description: 'Wellness, fitness, and medical seminars' },
  { name: 'Education', icon: '📚', description: 'Workshops, bootcamps, and training' },
  { name: 'Sports', icon: '⚽', description: 'Tournaments, marathons, and sports meets' },
];

function CategoriesPage({ events, theme }) {
  const dark = theme === 'dark';
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const filtered = selected
    ? events.filter(e => e.category === selected)
    : [];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 2rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{
          color: '#0099ff',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700, letterSpacing: '3px',
          fontSize: '0.75rem', marginBottom: '10px',
        }}>EXPLORE BY CATEGORY</p>
        <h1 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900, fontSize: '2.2rem', marginBottom: '10px',
        }}>Categories</h1>
        <p style={{
          color: dark ? '#888' : '#666',
          fontSize: '0.95rem', maxWidth: 500,
        }}>
          Browse events by category and find exactly
          what interests you.
        </p>
      </div>

      {/* Category Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px', marginBottom: '48px',
      }}>
        {CATEGORIES.map(cat => (
          <div
            key={cat.name}
            onClick={() => setSelected(
              selected === cat.name ? null : cat.name
            )}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#0099ff';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = selected === cat.name
                ? '#0099ff'
                : dark ? '#0f1e2e' : '#e0e0f0';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            style={{
              background: selected === cat.name
                ? dark ? '#0a1e30' : '#e0f0ff'
                : dark ? '#0d1a28' : '#ffffff',
              border: `1px solid ${selected === cat.name
                ? '#0099ff'
                : dark ? '#0f1e2e' : '#e0e0f0'}`,
              borderRadius: '16px', padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>

            {/* Icon */}
            <div style={{
              width: 52, height: 52, borderRadius: '14px',
              background: selected === cat.name
                ? 'linear-gradient(135deg, #0099ff, #00e5ff)'
                : dark ? '#080d14' : '#f0f8ff',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '1.6rem',
              marginBottom: '14px',
              transition: 'background 0.2s ease',
            }}>{cat.icon}</div>

            <h3 style={{
              color: dark ? '#fff' : '#0a1628',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: '1.1rem', marginBottom: '6px',
            }}>{cat.name}</h3>

            <p style={{
              color: dark ? '#888' : '#666',
              fontSize: '0.83rem', lineHeight: 1.5, marginBottom: '12px',
            }}>{cat.description}</p>

            <p style={{
              color: '#0099ff', fontSize: '0.8rem',
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
            }}>
              {events.filter(e => e.category === cat.name).length} events →
            </p>
          </div>
        ))}
      </div>

      {/* Filtered Events */}
      {selected && (
        <div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '24px',
          }}>
            <h2 style={{
              color: dark ? '#fff' : '#0a1628',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: '1.5rem',
            }}>{selected} Events</h2>
            <button
              onClick={() => setSelected(null)}
              style={{
                background: 'transparent',
                color: dark ? '#888' : '#666',
                border: `1px solid ${dark ? '#333' : '#ddd'}`,
                borderRadius: '8px', padding: '6px 14px',
                cursor: 'pointer',
                fontFamily: "'Syne', sans-serif", fontSize: '0.83rem',
              }}>Clear ✕</button>
          </div>

          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 0',
              color: dark ? '#555' : '#aaa',
              fontFamily: "'Syne', sans-serif",
            }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                No events in this category yet.
              </p>
              <p style={{ fontSize: '0.85rem' }}>
                Be the first to host one!
              </p>
              <button onClick={() => navigate('/create')} style={{
                marginTop: '20px',
                background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
                color: '#fff', border: 'none', borderRadius: '10px',
                padding: '12px 24px', cursor: 'pointer',
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
              }}>Host an Event</button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}>
              {filtered.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  theme={theme}
                  onClick={() => navigate(`/event/${event._id || event.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
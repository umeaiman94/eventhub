import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';

const CATEGORIES = ["All", "Technology", "Design", "Business", "Health", "Education", "Sports"];

function HomePage({ events }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const filteredEvents = events.filter(event =>
    (selectedCategory === 'All' || event.category === selectedCategory) &&
    (event.title.toLowerCase().includes(search.toLowerCase()) ||
     event.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(160deg, #0a0a0f 0%, #12101f 60%, #0a0a0f 100%)',
        padding: '80px 2rem 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
          top: -100, left: '50%', transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          color: '#6c63ff', fontFamily: "'Syne', sans-serif",
          fontWeight: 700, letterSpacing: '3px', fontSize: '0.75rem',
          marginBottom: '16px',
        }}>THE EVENTS PLATFORM</p>

        <h1 style={{
          color: '#fff', fontFamily: "'Syne', sans-serif",
          fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-1px',
        }}>
          Discover, Attend &<br />
          <span style={{
            background: 'linear-gradient(90deg, #6c63ff, #e040fb)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Host Events</span>
        </h1>

        <p style={{
          color: '#888', fontSize: '1rem',
          maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6,
        }}>
          Find exciting events near you or create your own.
          From tech summits to creative expos — everything in one place.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('events-section').scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'linear-gradient(135deg, #6c63ff, #e040fb)',
              color: '#fff', border: 'none', borderRadius: '10px',
              padding: '14px 28px', cursor: 'pointer',
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem',
            }}>
            Explore Events
          </button>
          <button onClick={() => navigate('/create')} style={{
            background: 'transparent', color: '#fff',
            border: '1px solid #333', borderRadius: '10px',
            padding: '14px 28px', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem',
          }}>
            Host an Event →
          </button>
        </div>
      </div>

      {/* Events Section */}
      <div id="events-section" style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 2rem' }}>

        {/* Search Bar */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Search events by name or location..."
          style={{
            width: '100%', padding: '14px 18px', borderRadius: '12px',
            background: '#111118', border: '1px solid #1e1e2e',
            color: '#fff', fontSize: '0.95rem', outline: 'none',
            fontFamily: "'Syne', sans-serif", boxSizing: 'border-box',
            marginBottom: '20px',
          }}
        />

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
              background: selectedCategory === cat
                ? 'linear-gradient(135deg, #6c63ff, #e040fb)'
                : '#111118',
              color: selectedCategory === cat ? '#fff' : '#888',
              border: '1px solid',
              borderColor: selectedCategory === cat ? 'transparent' : '#1e1e2e',
              borderRadius: '20px', padding: '7px 16px', cursor: 'pointer',
              fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: '0.82rem',
            }}>{cat}</button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div style={{
            textAlign: 'center', color: '#555',
            padding: '60px 0', fontFamily: "'Syne', sans-serif",
          }}>
            No events found. Try a different search or category.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => navigate(`/event/${event.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
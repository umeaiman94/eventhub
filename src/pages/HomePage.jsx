import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';

const CATEGORIES = ["All", "Technology", "Design", "Business", "Health", "Education", "Sports"];

function HomePage({ events, theme }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const dark = theme === 'dark';

  const filteredEvents = events.filter(event =>
    (selectedCategory === 'All' || event.category === selectedCategory) &&
    (event.title.toLowerCase().includes(search.toLowerCase()) ||
     event.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: dark
          ? 'linear-gradient(160deg, #080d14 0%, #0d1a28 60%, #080d14 100%)'
          : 'linear-gradient(160deg, #f0f4ff 0%, #e0eeff 60%, #f0f4ff 100%)',
        padding: '80px 2rem 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
      }}>

        {/* Glow */}
        <div style={{
          position: 'absolute', width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,153,255,0.15) 0%, transparent 70%)',
          top: -100, left: '50%', transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          color: '#0099ff',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700, letterSpacing: '3px',
          fontSize: '0.75rem', marginBottom: '16px',
        }}>THE EVENTS PLATFORM</p>

        <h1 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-1px',
        }}>
          Discover, Attend &<br />
          <span style={{
            background: 'linear-gradient(90deg, #0099ff, #00e5ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Host Events</span>
        </h1>

        <p style={{
          color: dark ? '#888' : '#666',
          fontSize: '1rem', maxWidth: 480,
          margin: '0 auto 32px', lineHeight: 1.6,
        }}>
          Find exciting events near you or create your own.
          From tech summits to creative expos — everything in one place.
        </p>

        <div style={{
          display: 'flex', gap: '12px',
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <button
            onClick={() => document.getElementById('events-section')
              .scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
              color: '#fff', border: 'none', borderRadius: '10px',
              padding: '14px 28px', cursor: 'pointer',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700, fontSize: '1rem',
            }}>
            Explore Events
          </button>
          <button onClick={() => navigate('/create')} style={{
            background: 'transparent',
            color: dark ? '#fff' : '#0a1628',
            border: `1px solid ${dark ? '#333' : '#ccd'}`,
            borderRadius: '10px', padding: '14px 28px',
            cursor: 'pointer', fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '1rem',
          }}>
            Host an Event →
          </button>
        </div>
      </div>

      {/* Events Section */}
      <div id="events-section" style={{
        maxWidth: 1100, margin: '0 auto', padding: '40px 2rem',
      }}>

        {/* Search Bar */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Search events by name or location..."
          style={{
            width: '100%', padding: '14px 18px', borderRadius: '12px',
            background: dark ? '#0d1a28' : '#ffffff',
            border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
            color: dark ? '#fff' : '#0a1628',
            fontSize: '0.95rem', outline: 'none',
            fontFamily: "'Syne', sans-serif",
            boxSizing: 'border-box', marginBottom: '20px',
            transition: 'background 0.3s ease',
          }}
        />

        {/* Category Filter */}
        <div style={{
          display: 'flex', gap: '8px',
          flexWrap: 'wrap', marginBottom: '32px',
        }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
              background: selectedCategory === cat
                ? 'linear-gradient(135deg, #0099ff, #00e5ff)'
                : dark ? '#0d1a28' : '#ffffff',
              color: selectedCategory === cat
                ? '#fff'
                : dark ? '#888' : '#555',
              border: '1px solid',
              borderColor: selectedCategory === cat
                ? 'transparent'
                : dark ? '#0f1e2e' : '#e0e0f0',
              borderRadius: '20px', padding: '7px 16px',
              cursor: 'pointer', fontFamily: "'Syne', sans-serif",
              fontWeight: 600, fontSize: '0.82rem',
              transition: 'all 0.2s ease',
            }}>{cat}</button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 0',
            color: dark ? '#555' : '#aaa',
            fontFamily: "'Syne', sans-serif",
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
                theme={theme}
                onClick={() => navigate(`/event/${event._id || event.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
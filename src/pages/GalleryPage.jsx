import React, { useState } from 'react';

const SAMPLE_GALLERY = [
  {
    id: 1,
    eventName: 'Tech Summit 2026',
    organizer: 'TechCorp',
    date: 'May 15, 2026',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80',
      'https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&q=80',
    ],
  },
  {
    id: 2,
    eventName: 'Design & Creative Expo',
    organizer: 'Creative Hub',
    date: 'July 2, 2026',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&q=80',
    ],
  },
  {
    id: 3,
    eventName: 'Startup Pitch Night',
    organizer: "Founder's Circle",
    date: 'July 20, 2026',
    images: [
      'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=600&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
    ],
  },
];

function GalleryPage({ theme, user }) {
  const dark = theme === 'dark';
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploadingFor, setUploadingFor] = useState(null);
  const [gallery, setGallery] = useState(SAMPLE_GALLERY);

  const handleUpload = (eventId) => {
    if (!user) {
      alert('Please login to upload photos.');
      return;
    }
    const url = prompt('Paste your image URL:');
    if (url && url.trim()) {
      setGallery(prev => prev.map(ev =>
        ev.id === eventId
          ? { ...ev, images: [...ev.images, url.trim()] }
          : ev
      ));
    }
    setUploadingFor(null);
  };

  return (
    <div style={{
      maxWidth: 1100, margin: '0 auto', padding: '40px 2rem',
    }}>

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{
          color: '#0099ff',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700, letterSpacing: '3px',
          fontSize: '0.75rem', marginBottom: '10px',
        }}>POST EVENT MEMORIES</p>
        <h1 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900, fontSize: '2.2rem', marginBottom: '10px',
        }}>Event Gallery</h1>
        <p style={{
          color: dark ? '#888' : '#666',
          fontSize: '0.95rem', maxWidth: 500,
        }}>
          Relive the best moments from past events.
          Organizers can upload post-event photos here.
        </p>
      </div>

      {/* Gallery Sections */}
      {gallery.map(ev => (
        <div key={ev.id} style={{ marginBottom: '48px' }}>

          {/* Event Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '16px',
            flexWrap: 'wrap', gap: '12px',
          }}>
            <div>
              <h2 style={{
                color: dark ? '#fff' : '#0a1628',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800, fontSize: '1.3rem', margin: '0 0 4px',
              }}>{ev.eventName}</h2>
              <p style={{
                color: dark ? '#888' : '#666', fontSize: '0.82rem',
              }}>
                📅 {ev.date} &nbsp;·&nbsp; 🏢 {ev.organizer}
              </p>
            </div>

            {/* Upload Button */}
            <button
              onClick={() => handleUpload(ev.id)}
              style={{
                background: dark ? '#0a1e30' : '#e0f0ff',
                color: '#0099ff',
                border: '1px solid #0099ff',
                borderRadius: '10px', padding: '8px 16px',
                cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: '0.83rem',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
              📸 Upload Photo
            </button>
          </div>

          {/* Image Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '12px',
          }}>
            {ev.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImg(img)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.borderColor = '#0099ff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                style={{
                  height: 200, borderRadius: '12px',
                  overflow: 'hidden', cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}>
                <img
                  src={img} alt={`${ev.eventName} ${i + 1}`}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Lightbox */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 9999, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}>
          <button
            onClick={() => setSelectedImg(null)}
            style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(255,255,255,0.1)',
              border: 'none', color: '#fff',
              fontSize: '1.5rem', cursor: 'pointer',
              borderRadius: '50%', width: 44, height: 44,
            }}>✕</button>
          <img
            src={selectedImg} alt="Full view"
            style={{
              maxWidth: '90%', maxHeight: '90vh',
              borderRadius: '12px', objectFit: 'contain',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
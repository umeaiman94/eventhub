import React, { useState, useRef } from 'react';
import { uploadImage } from '../api';

function GalleryPage({ theme, user, userRole, events }) {
  const dark = theme === 'dark';
  const [selectedImg, setSelectedImg] = useState(null);
  const [gallery, setGallery] = useState({});
  const [likes, setLikes] = useState({});
  const [uploading, setUploading] = useState(null);
  const fileInputRef = useRef(null);
  const [currentEventId, setCurrentEventId] = useState(null);

  const handleUploadClick = (eventId) => {
    if (!user) { alert('Please login to upload photos.'); return; }
    setCurrentEventId(eventId);
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(currentEventId);
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadImage(formData);
      setGallery(prev => ({
        ...prev,
        [currentEventId]: [...(prev[currentEventId] || []), res.data.url],
      }));
    } catch (err) {
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  const handleLike = (imgKey) => {
    if (!user) { alert('Please login to like photos.'); return; }
    setLikes(prev => ({
      ...prev,
      [imgKey]: prev[imgKey] ? prev[imgKey] + 1 : 1,
    }));
  };

  const getImages = (event) => {
    const uploaded = gallery[event._id || event.id] || [];
    const banner = event.banner ? [event.banner] : [];
    return [...banner, ...uploaded];
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 2rem' }}>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{
          color: '#0099ff', fontFamily: "'Syne', sans-serif",
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
          {userRole === 'organizer'
            ? ' As an organizer you can upload post event photos.'
            : ' Browse and like your favorite moments.'}
        </p>
      </div>

      {/* Role Badge */}
      {user && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: userRole === 'organizer'
            ? dark ? '#0a1e30' : '#e0f0ff'
            : dark ? '#0a2e1a' : '#e0ffe8',
          border: `1px solid ${userRole === 'organizer' ? '#0099ff' : '#4caf50'}`,
          borderRadius: '20px', padding: '6px 14px',
          marginBottom: '32px',
        }}>
          <span>{userRole === 'organizer' ? '🏢' : '👤'}</span>
          <span style={{
            color: userRole === 'organizer' ? '#0099ff' : '#4caf50',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '0.82rem',
          }}>
            {userRole === 'organizer'
              ? 'Organizer — Can upload photos'
              : 'Attendee — Can view & like photos'}
          </span>
        </div>
      )}

      {/* No Events */}
      {events.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 0',
          fontFamily: "'Syne', sans-serif",
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '20px',
            background: dark ? '#0d1a28' : '#e0f0ff',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '2.5rem',
            margin: '0 auto 20px',
          }}>🖼️</div>
          <h3 style={{
            color: dark ? '#fff' : '#0a1628',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, marginBottom: '8px',
          }}>No Events Yet</h3>
          <p style={{ color: dark ? '#555' : '#aaa', fontSize: '0.9rem' }}>
            Gallery photos will appear here once events are created.
          </p>
        </div>
      ) : (
        events.map(ev => (
          <div key={ev._id || ev.id} style={{ marginBottom: '48px' }}>

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
                }}>{ev.title}</h2>
                <p style={{ color: dark ? '#888' : '#666', fontSize: '0.82rem' }}>
                  📅 {ev.date} &nbsp;·&nbsp; 🏢 {ev.organizer}
                </p>
              </div>

              {/* Upload Button - organizers only */}
              {userRole === 'organizer' ? (
                <button
                  onClick={() => handleUploadClick(ev._id || ev.id)}
                  disabled={uploading === (ev._id || ev.id)}
                  style={{
                    background: dark ? '#0a1e30' : '#e0f0ff',
                    color: '#0099ff', border: '1px solid #0099ff',
                    borderRadius: '10px', padding: '8px 16px',
                    cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                    fontWeight: 700, fontSize: '0.83rem',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    opacity: uploading === (ev._id || ev.id) ? 0.7 : 1,
                  }}>
                  {uploading === (ev._id || ev.id) ? '⏳ Uploading...' : '📸 Upload Photo'}
                </button>
              ) : (
                <div style={{
                  background: dark ? '#0a2e1a' : '#e0ffe8',
                  color: '#4caf50', border: '1px solid #4caf50',
                  borderRadius: '10px', padding: '8px 16px',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700, fontSize: '0.83rem',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  👁️ View & Like Only
                </div>
              )}
            </div>

            {/* Image Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '12px',
            }}>
              {getImages(ev).map((img, i) => {
                const imgKey = `${ev._id || ev.id}-${i}`;
                return (
                  <div key={i} style={{ position: 'relative' }}>
                    <div
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
                        src={img} alt={`${ev.title} ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(imgKey)}
                      style={{
                        position: 'absolute', bottom: 10, right: 10,
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)',
                        border: 'none', borderRadius: '20px',
                        padding: '5px 12px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '5px',
                        color: '#fff', fontSize: '0.78rem',
                        fontFamily: "'Syne', sans-serif", fontWeight: 700,
                      }}>
                      ❤️ {likes[imgKey] || 0}
                    </button>
                  </div>
                );
              })}

              {/* Empty state */}
              {getImages(ev).length === 0 && (
                <div style={{
                  height: 200, borderRadius: '12px',
                  border: `2px dashed ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexDirection: 'column', gap: '8px',
                }}>
                  <span style={{ fontSize: '2rem' }}>📸</span>
                  <p style={{
                    color: dark ? '#555' : '#aaa', fontSize: '0.82rem',
                    fontFamily: "'Syne', sans-serif",
                  }}>No photos yet</p>
                </div>
              )}
            </div>
          </div>
        ))
      )}

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
          <button onClick={() => setSelectedImg(null)} style={{
            position: 'absolute', top: 20, right: 20,
            background: 'rgba(255,255,255,0.1)',
            border: 'none', color: '#fff', fontSize: '1.5rem',
            cursor: 'pointer', borderRadius: '50%', width: 44, height: 44,
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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyEvents, deleteEvent, getEventRegistrations } from '../api';

function OrganizerDashboardPage({ theme, user }) {
  const dark = theme === 'dark';
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [regLoading, setRegLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await getMyEvents();
        setEvents(res.data);
      } catch (err) {
        setError('Could not load your events.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, []);

  const handleViewRegistrations = async (event) => {
    setSelectedEvent(event);
    setRegLoading(true);
    try {
      const res = await getEventRegistrations(event._id);
      setRegistrations(res.data);
    } catch (err) {
      setRegistrations([]);
    } finally {
      setRegLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(prev => prev.filter(e => e._id !== eventId));
      setDeleteConfirm(null);
      if (selectedEvent?._id === eventId) {
        setSelectedEvent(null);
        setRegistrations([]);
      }
    } catch (err) {
      alert('Could not delete event.');
    }
  };

  const inputStyle = {
    background: dark ? '#080d14' : '#f8faff',
    border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
    color: dark ? '#fff' : '#0a1628',
  };

  if (loading) return (
    <div style={{
      textAlign: 'center', padding: '80px 2rem',
      fontFamily: "'Syne', sans-serif",
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        border: '3px solid #0099ff',
        borderTopColor: 'transparent',
        margin: '0 auto 16px',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: dark ? '#888' : '#666' }}>Loading your events...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 2rem' }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px',
      }}>
        <div>
          <p style={{
            color: '#0099ff', fontFamily: "'Syne', sans-serif",
            fontWeight: 700, letterSpacing: '3px',
            fontSize: '0.75rem', marginBottom: '6px',
          }}>ORGANIZER PANEL</p>
          <h1 style={{
            color: dark ? '#fff' : '#0a1628',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900, fontSize: '2rem', margin: 0,
          }}>My Events</h1>
        </div>
        <button onClick={() => navigate('/create')} style={{
          background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
          color: '#fff', border: 'none', borderRadius: '10px',
          padding: '12px 24px', cursor: 'pointer',
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
        }}>+ Host New Event</button>
      </div>

      {error && (
        <div style={{
          background: '#2a0a0a', border: '1px solid #ff4d4d',
          borderRadius: '10px', padding: '10px 14px',
          color: '#ff4d4d', fontSize: '0.85rem',
          fontFamily: "'Syne', sans-serif", marginBottom: '16px',
        }}>{error}</div>
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
          }}>📅</div>
          <h3 style={{
            color: dark ? '#fff' : '#0a1628',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, marginBottom: '8px',
          }}>No Events Yet</h3>
          <p style={{
            color: dark ? '#555' : '#aaa',
            fontSize: '0.9rem', marginBottom: '24px',
          }}>You have not hosted any events yet.</p>
          <button onClick={() => navigate('/create')} style={{
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            color: '#fff', border: 'none', borderRadius: '10px',
            padding: '12px 24px', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
          }}>Host Your First Event</button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: selectedEvent ? '1fr 1fr' : '1fr',
          gap: '24px', alignItems: 'start',
        }}>

          {/* Events List */}
          <div>
            {events.map(event => (
              <div key={event._id} style={{
                background: dark ? '#0d1a28' : '#ffffff',
                border: `1px solid ${selectedEvent?._id === event._id
                  ? '#0099ff'
                  : dark ? '#0f1e2e' : '#e0e0f0'}`,
                borderRadius: '14px', padding: '20px',
                marginBottom: '16px',
                transition: 'border-color 0.2s',
              }}>

                {/* Event Header */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'start', marginBottom: '12px',
                  flexWrap: 'wrap', gap: '8px',
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      color: dark ? '#fff' : '#0a1628',
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800, fontSize: '1.1rem', margin: '0 0 4px',
                    }}>{event.title}</h3>
                    <p style={{
                      color: dark ? '#888' : '#666', fontSize: '0.8rem',
                    }}>
                      📅 {event.date} &nbsp;·&nbsp; 📍 {event.location}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span style={{
                    background: dark ? '#0a1e30' : '#e0f0ff',
                    color: '#0099ff', fontSize: '0.75rem',
                    padding: '4px 10px', borderRadius: '20px',
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  }}>{event.category}</span>
                </div>

                {/* Stats Row */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px', marginBottom: '14px',
                }}>
                  {[
                    { label: 'Total Seats', value: event.seats },
                    { label: 'Registered', value: event.registered },
                    { label: 'Available', value: event.seats - event.registered },
                  ].map((stat, i) => (
                    <div key={i} style={{
                      background: dark ? '#080d14' : '#f8faff',
                      border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                      borderRadius: '10px', padding: '10px',
                      textAlign: 'center',
                    }}>
                      <p style={{
                        color: '#0099ff', fontFamily: "'Syne', sans-serif",
                        fontWeight: 900, fontSize: '1.4rem', margin: '0 0 2px',
                      }}>{stat.value}</p>
                      <p style={{
                        color: dark ? '#888' : '#666',
                        fontSize: '0.72rem',
                        fontFamily: "'Syne', sans-serif",
                      }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div style={{
                  background: dark ? '#0a1628' : '#e8f4ff',
                  borderRadius: '6px', height: 6, marginBottom: '14px',
                }}>
                  <div style={{
                    width: `${Math.min((event.registered / event.seats) * 100, 100)}%`,
                    height: '100%', borderRadius: '6px',
                    background: 'linear-gradient(90deg, #0099ff, #00e5ff)',
                    transition: 'width 0.3s ease',
                  }} />
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleViewRegistrations(event)}
                    style={{
                      flex: 1, background: dark ? '#0a1e30' : '#e0f0ff',
                      color: '#0099ff', border: '1px solid #0099ff',
                      borderRadius: '8px', padding: '8px 12px',
                      cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                      fontWeight: 700, fontSize: '0.82rem',
                    }}>
                    👥 View Registrations ({event.registered})
                  </button>

                  <button
                    onClick={() => navigate(`/event/${event._id}`)}
                    style={{
                      background: dark ? '#0d1a28' : '#f8faff',
                      color: dark ? '#aaa' : '#555',
                      border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                      borderRadius: '8px', padding: '8px 12px',
                      cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                      fontWeight: 700, fontSize: '0.82rem',
                    }}>
                    👁️ View
                  </button>

                  <button
                    onClick={() => setDeleteConfirm(event._id)}
                    style={{
                      background: dark ? '#2a0a0a' : '#fff0f0',
                      color: '#ff4d4d', border: '1px solid #ff4d4d',
                      borderRadius: '8px', padding: '8px 12px',
                      cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                      fontWeight: 700, fontSize: '0.82rem',
                    }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Registrations Panel */}
          {selectedEvent && (
            <div style={{
              background: dark ? '#0d1a28' : '#ffffff',
              border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
              borderRadius: '14px', padding: '20px',
              position: 'sticky', top: '80px',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '16px',
              }}>
                <h3 style={{
                  color: dark ? '#fff' : '#0a1628',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800, fontSize: '1rem', margin: 0,
                }}>
                  Registrations — {selectedEvent.title}
                </h3>
                <button onClick={() => { setSelectedEvent(null); setRegistrations([]); }} style={{
                  background: 'transparent', border: 'none',
                  color: dark ? '#888' : '#aaa', cursor: 'pointer',
                  fontSize: '1.1rem',
                }}>✕</button>
              </div>

              {regLoading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    border: '3px solid #0099ff',
                    borderTopColor: 'transparent',
                    margin: '0 auto',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                </div>
              ) : registrations.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '32px 0',
                  color: dark ? '#555' : '#aaa',
                  fontFamily: "'Syne', sans-serif",
                }}>
                  <p style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</p>
                  <p>No registrations yet</p>
                </div>
              ) : (
                <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  {registrations.map((reg, i) => (
                    <div key={i} style={{
                      background: dark ? '#080d14' : '#f8faff',
                      border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                      borderRadius: '10px', padding: '14px',
                      marginBottom: '10px',
                    }}>
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: '8px',
                      }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'center', color: '#fff',
                          fontWeight: 700, fontSize: '0.85rem',
                        }}>
                          {(reg.data?.get?.('Full Name') || reg.userEmail || 'A')[0].toUpperCase()}
                        </div>
                        <span style={{
                          color: dark ? '#888' : '#666',
                          fontSize: '0.75rem',
                          fontFamily: "'Syne', sans-serif",
                        }}>
                          {new Date(reg.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {reg.data && Object.entries(reg.data).map(([key, value]) => (
                        <p key={key} style={{
                          color: dark ? '#888' : '#666',
                          fontSize: '0.8rem', margin: '3px 0',
                          fontFamily: "'Syne', sans-serif",
                        }}>
                          <span style={{
                            color: dark ? '#ccc' : '#333', fontWeight: 600,
                          }}>{key}:</span> {value}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 1rem',
        }}>
          <div style={{
            background: dark ? '#0d1a28' : '#ffffff',
            border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
            borderRadius: '20px', padding: '32px',
            maxWidth: 400, width: '100%', textAlign: 'center',
            animation: 'popIn 0.3s ease',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🗑️</div>
            <h3 style={{
              color: dark ? '#fff' : '#0a1628',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900, marginBottom: '8px',
            }}>Delete Event?</h3>
            <p style={{
              color: dark ? '#888' : '#666',
              fontSize: '0.9rem', marginBottom: '24px',
              lineHeight: 1.6,
            }}>
              This will permanently delete the event and all its registrations.
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  flex: 1, background: 'transparent',
                  color: dark ? '#aaa' : '#555',
                  border: `1px solid ${dark ? '#333' : '#ddd'}`,
                  borderRadius: '10px', padding: '12px',
                  cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                }}>Cancel</button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                style={{
                  flex: 1, background: '#ff4d4d',
                  color: '#fff', border: 'none',
                  borderRadius: '10px', padding: '12px',
                  cursor: 'pointer', fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizerDashboardPage;
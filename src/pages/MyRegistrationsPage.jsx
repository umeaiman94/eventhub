import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyRegistrations } from '../api';

function MyRegistrationsPage({ theme }) {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await getMyRegistrations();
        setRegistrations(res.data);
      } catch (err) {
        setError('Could not load registrations.');
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

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
      <p style={{ color: dark ? '#888' : '#666' }}>
        Loading registrations...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 2rem' }}>

      <h1 style={{
        color: dark ? '#fff' : '#0a1628',
        fontFamily: "'Syne', sans-serif",
        fontWeight: 900, fontSize: '2rem', marginBottom: '8px',
      }}>My Registrations</h1>

      <p style={{ color: dark ? '#888' : '#666', marginBottom: '32px' }}>
        Events you have signed up for.
      </p>

      {/* Error */}
      {error && (
        <div style={{
          background: '#2a0a0a', border: '1px solid #ff4d4d',
          borderRadius: '10px', padding: '10px 14px',
          color: '#ff4d4d', fontSize: '0.85rem',
          fontFamily: "'Syne', sans-serif", marginBottom: '16px',
        }}>{error}</div>
      )}

      {registrations.length === 0 ? (
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
          }}>🎟️</div>

          <h3 style={{
            color: dark ? '#fff' : '#0a1628',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, marginBottom: '8px',
          }}>No Registrations Yet</h3>

          <p style={{
            color: dark ? '#555' : '#aaa',
            fontSize: '0.9rem', marginBottom: '24px',
          }}>
            You have not signed up for any events yet.
          </p>

          <button onClick={() => navigate('/')} style={{
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            color: '#fff', border: 'none', borderRadius: '10px',
            padding: '12px 24px', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
          }}>Browse Events</button>
        </div>

      ) : (
        registrations.map((reg, index) => (
          <div key={index} style={{
            background: dark ? '#0d1a28' : '#ffffff',
            border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
            borderRadius: '14px', padding: '20px',
            marginBottom: '16px',
            transition: 'background 0.3s ease',
          }}>

            {/* Top Row */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'start', marginBottom: '8px',
            }}>
              <h3 style={{
                color: dark ? '#fff' : '#0a1628',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800, margin: 0,
              }}>{reg.eventTitle}</h3>

              <span style={{
                background: dark ? '#0a2e1a' : '#e8f8ee',
                color: '#4caf50', fontSize: '0.75rem',
                padding: '4px 10px', borderRadius: '20px',
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
              }}>✅ Registered</span>
            </div>

            <p style={{
              color: dark ? '#888' : '#666',
              fontSize: '0.8rem', marginBottom: '12px',
            }}>
              Registered on {new Date(reg.createdAt).toLocaleDateString()}
            </p>

            {/* Form Data */}
            <div style={{
              borderTop: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
              paddingTop: '12px',
            }}>
              {reg.data && Object.entries(reg.data).map(([key, value]) => (
                <p key={key} style={{
                  color: dark ? '#888' : '#666',
                  fontSize: '0.83rem', margin: '4px 0',
                }}>
                  <span style={{
                    color: dark ? '#ccc' : '#333', fontWeight: 600,
                  }}>{key}:</span> {value}
                </p>
              ))}
            </div>

            {/* View Event Button */}
            <button
              onClick={() => navigate(`/event/${reg.eventId}`)}
              style={{
                marginTop: '14px', background: 'transparent',
                color: '#0099ff', border: '1px solid #0099ff',
                borderRadius: '8px', padding: '7px 16px',
                cursor: 'pointer', fontSize: '0.82rem',
                fontFamily: "'Syne', sans-serif", fontWeight: 600,
              }}>View Event →</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRegistrationsPage;
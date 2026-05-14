import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyRegistrationsPage({ registrations }) {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 2rem' }}>
      <h1 style={{
        color: '#fff', fontFamily: "'Syne', sans-serif",
        fontWeight: 900, fontSize: '2rem', marginBottom: '8px',
      }}>My Registrations</h1>
      <p style={{ color: '#888', marginBottom: '32px' }}>
        Events you have signed up for.
      </p>

      {registrations.length === 0 ? (
        <div style={{
          textAlign: 'center', color: '#555',
          padding: '60px 0', fontFamily: "'Syne', sans-serif",
        }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            No registrations yet.
          </p>
          <button onClick={() => navigate('/')} style={{
            background: 'linear-gradient(135deg, #6c63ff, #e040fb)',
            color: '#fff', border: 'none', borderRadius: '10px',
            padding: '12px 24px', cursor: 'pointer',
            fontFamily: "'Syne', sans-serif", fontWeight: 700,
          }}>Browse Events</button>
        </div>
      ) : (
        registrations.map((reg, index) => (
          <div key={index} style={{
            background: '#111118', border: '1px solid #1e1e2e',
            borderRadius: '14px', padding: '20px', marginBottom: '16px',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'start',
            }}>
              <h3 style={{
                color: '#fff', fontFamily: "'Syne', sans-serif",
                fontWeight: 800, margin: 0,
              }}>{reg.eventTitle}</h3>
              <span style={{
                background: '#1a2e1a', color: '#4caf50',
                fontSize: '0.75rem', padding: '4px 10px',
                borderRadius: '20px', fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
              }}>Registered</span>
            </div>

            <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '6px' }}>
              Registered on {reg.date}
            </p>

            <div style={{
              marginTop: '12px', borderTop: '1px solid #1e1e2e', paddingTop: '12px',
            }}>
              {Object.entries(reg.data).map(([key, value]) => (
                <p key={key} style={{ color: '#888', fontSize: '0.83rem', margin: '4px 0' }}>
                  <span style={{ color: '#ccc' }}>{key}:</span> {value}
                </p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRegistrationsPage;
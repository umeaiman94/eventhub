import React, { useState } from 'react';

const FAQS = [
  {
    q: 'How do I register for an event?',
    a: 'Browse events on the home page, click on any event you like, fill in the registration form and click Submit Registration. You will receive a confirmation email instantly.',
  },
  {
    q: 'How do I become an organizer?',
    a: 'During signup select the Organizer option, fill in your organization details and complete the subscription. Your account will be activated and you can start hosting events.',
  },
  {
    q: 'Can I cancel my registration?',
    a: 'Currently registrations cannot be self-cancelled. Please contact the event organizer directly or email us at support@eventhub.com for assistance.',
  },
  {
    q: 'How do I download my ticket?',
    a: 'After registering for an event go to the event page. You will see a Download Ticket button which saves your ticket as a file.',
  },
  {
    q: 'Why is my organizer account pending?',
    a: 'Organizer accounts go through a quick review to maintain quality on EventHub. You will receive an email once your account is approved, usually within 24 hours.',
  },
  {
    q: 'How do I upload photos to the gallery?',
    a: 'Verified organizers can upload post-event photos from the Gallery page. Click Upload Photo next to your event and select an image from your device.',
  },
  {
    q: 'I forgot my password. What do I do?',
    a: 'Password reset is coming soon. For now please contact us at support@eventhub.com and we will help you regain access.',
  },
  {
    q: 'Is EventHub free to use?',
    a: 'Yes! EventHub is completely free for attendees. Organizers have a subscription plan with the first event hosting free.',
  },
];

function HelpPage({ theme }) {
  const dark = theme === 'dark';
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(
    faq =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 2rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <div style={{
          width: 70, height: 70, borderRadius: '20px',
          background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem', margin: '0 auto 16px',
          boxShadow: '0 0 30px rgba(0,153,255,0.3)',
        }}>❓</div>
        <h1 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900, fontSize: '2rem', marginBottom: '8px',
        }}>Help & Support</h1>
        <p style={{ color: dark ? '#888' : '#666', fontSize: '0.95rem' }}>
          Find answers to common questions or contact us directly.
        </p>
      </div>

      {/* About EventHub */}
      <div style={{
        background: dark ? '#0d1a28' : '#ffffff',
        border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
        borderRadius: '16px', padding: '24px', marginBottom: '24px',
      }}>
        <h2 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: '1.1rem', marginBottom: '12px',
        }}>About EventHub</h2>
        <p style={{
          color: dark ? '#aaa' : '#555',
          fontSize: '0.88rem', lineHeight: 1.8, margin: 0,
        }}>
          EventHub is a full stack event management platform built for discovering,
          attending, and hosting events across Pakistan and beyond. Whether you are
          looking for tech summits, creative expos, or startup pitch nights —
          EventHub connects people with experiences that matter.
          Organizers can create and manage events, track registrations, and
          engage their audience through our gallery and notification system.
        </p>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="🔍  Search questions..."
        style={{
          width: '100%', padding: '13px 18px', borderRadius: '12px',
          background: dark ? '#0d1a28' : '#ffffff',
          border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
          color: dark ? '#fff' : '#0a1628', fontSize: '0.95rem',
          outline: 'none', fontFamily: "'Syne', sans-serif",
          boxSizing: 'border-box', marginBottom: '20px',
        }}
      />

      {/* FAQs */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, fontSize: '1.1rem', marginBottom: '16px',
        }}>Frequently Asked Questions</h2>

        {filtered.length === 0 ? (
          <p style={{ color: dark ? '#555' : '#aaa', fontFamily: "'Syne', sans-serif" }}>
            No results found. Try a different search.
          </p>
        ) : (
          filtered.map((faq, i) => (
            <div
              key={i}
              style={{
                background: dark ? '#0d1a28' : '#ffffff',
                border: `1px solid ${openIndex === i ? '#0099ff' : dark ? '#0f1e2e' : '#e0e0f0'}`,
                borderRadius: '12px', marginBottom: '10px',
                overflow: 'hidden', transition: 'border-color 0.2s',
              }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 20px', background: 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: dark ? '#fff' : '#0a1628',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700, fontSize: '0.9rem', textAlign: 'left',
                }}>
                {faq.q}
                <span style={{
                  color: '#0099ff', fontSize: '1.1rem',
                  transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                  transition: 'transform 0.2s ease', flexShrink: 0,
                }}>+</span>
              </button>

              {openIndex === i && (
                <div style={{
                  padding: '0 20px 16px',
                  borderTop: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
                }}>
                  <p style={{
                    color: dark ? '#aaa' : '#555',
                    fontSize: '0.85rem', lineHeight: 1.7,
                    margin: '12px 0 0',
                    fontFamily: "'Syne', sans-serif",
                  }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Contact */}
      <div style={{
        background: 'linear-gradient(135deg, #0099ff22, #00e5ff11)',
        border: '1px solid #0099ff44',
        borderRadius: '16px', padding: '24px', textAlign: 'center',
      }}>
        <p style={{ fontSize: '1.5rem', marginBottom: '8px' }}>💬</p>
        <h3 style={{
          color: dark ? '#fff' : '#0a1628',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800, marginBottom: '8px',
        }}>Still need help?</h3>
        <p style={{
          color: dark ? '#888' : '#666',
          fontSize: '0.85rem', marginBottom: '16px',
        }}>
          Our team is here to help you with anything.
        </p>
        <a href="mailto:support@eventhub.com" style={{
          background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
          color: '#fff', textDecoration: 'none',
          borderRadius: '10px', padding: '11px 24px',
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: '0.9rem', display: 'inline-block',
        }}>📧 Contact Support</a>
      </div>
    </div>
  );
}

export default HelpPage;
import React from 'react';

function Footer({ theme }) {
  const dark = theme === 'dark';

  return (
    <footer
      style={{
        background: dark ? '#050a10' : '#f0f4ff',
        borderTop: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
        padding: '40px 2rem 24px',
        marginTop: '60px',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '32px',
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                color: '#fff',
                fontSize: '16px',
              }}
            >
              E
            </div>

            <span
              style={{
                color: dark ? '#fff' : '#0a1628',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '1.1rem',
              }}
            >
              Event<span style={{ color: '#0099ff' }}>Hub</span>
            </span>
          </div>

          <p
            style={{
              color: dark ? '#888' : '#666',
              fontSize: '0.83rem',
              lineHeight: 1.7,
              marginBottom: '16px',
            }}
          >
            Your go-to platform for discovering, attending, and hosting
            events.
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background:
                  'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                fontSize: '1.1rem',
              }}
            >
              📸
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: '#1877f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                fontSize: '1.1rem',
              }}
            >
              👥
            </a>

            {/* Twitter/X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: dark ? '#1a1a2e' : '#e8f0ff',
                border: `1px solid ${dark ? '#333' : '#ddd'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                fontSize: '1.1rem',
                color: dark ? '#fff' : '#000',
              }}
            >
              𝕏
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              color: dark ? '#fff' : '#0a1628',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '0.95rem',
              marginBottom: '14px',
            }}
          >
            Quick Links
          </h4>

          {[
            { label: 'Browse Events', path: '/' },
            { label: 'Gallery', path: '/gallery' },
            { label: 'Categories', path: '/categories' },
            { label: 'Host an Event', path: '/create' },
          ].map((link, i) => (
            <a
              key={i}
              href={link.path}
              style={{
                display: 'block',
                color: dark ? '#888' : '#666',
                textDecoration: 'none',
                fontSize: '0.85rem',
                marginBottom: '8px',
                fontFamily: "'Syne', sans-serif",
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#0099ff')}
              onMouseLeave={(e) =>
                (e.target.style.color = dark ? '#888' : '#666')
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Support */}
        <div>
          <h4
            style={{
              color: dark ? '#fff' : '#0a1628',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '0.95rem',
              marginBottom: '14px',
            }}
          >
            Support
          </h4>

          {[
            'Help Center',
            'Contact Us',
            'Privacy Policy',
            'Terms of Service',
          ].map((item, i) => (
            <p
              key={i}
              style={{
                color: dark ? '#888' : '#666',
                fontSize: '0.85rem',
                marginBottom: '8px',
                cursor: 'pointer',
                fontFamily: "'Syne', sans-serif",
              }}
              onMouseEnter={(e) => (e.target.style.color = '#0099ff')}
              onMouseLeave={(e) =>
                (e.target.style.color = dark ? '#888' : '#666')
              }
            >
              {item}
            </p>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              color: dark ? '#fff' : '#0a1628',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '0.95rem',
              marginBottom: '14px',
            }}
          >
            Contact
          </h4>

          {[
            { icon: '📧', text: 'support@eventhub.com' },
            { icon: '📍', text: 'Rawalpindi, Pakistan' },
            { icon: '🕐', text: 'Mon - Fri, 9am - 6pm' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'start',
                marginBottom: '10px',
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>

              <span
                style={{
                  color: dark ? '#888' : '#666',
                  fontSize: '0.83rem',
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <p
          style={{
            color: dark ? '#555' : '#aaa',
            fontSize: '0.8rem',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          © 2026 EventHub. All rights reserved.
        </p>

        <p
          style={{
            color: dark ? '#555' : '#aaa',
            fontSize: '0.8rem',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Built with ❤️ in Pakistan
        </p>
      </div>
    </footer>
  );
}

export default Footer;
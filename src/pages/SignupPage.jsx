import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';
import PasswordInput from '../components/PasswordInput';

function SignupPage({ setUser, setUserEmail, setUserRole, setOrganizerVerified, theme }) {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('attendee');
  const [organization, setOrganization] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill all fields.'); return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.'); return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.'); return;
    }
    if (role === 'organizer' && !organization.trim()) {
      setError('Please enter your organization name.'); return;
    }
    try {
      setLoading(true);
      setError('');
      const res = await signup({ name, email, password, role, organization });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user.name);
      setUserEmail(res.data.user.email);
      setUserRole(res.data.user.role || 'attendee');
      setOrganizerVerified(res.data.user.organizerVerified || false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    background: dark ? '#080d14' : '#f8faff',
    border: `1px solid ${dark ? '#0f2e4e' : '#e0e0f0'}`,
    color: dark ? '#fff' : '#0a1628', fontSize: '0.9rem',
    outline: 'none', fontFamily: "'Syne', sans-serif",
    boxSizing: 'border-box', marginBottom: '16px',
  };

  const labelStyle = {
    color: dark ? '#aaa' : '#555', fontSize: '0.85rem',
    fontFamily: "'Syne', sans-serif",
    display: 'block', marginBottom: '6px',
  };

  return (
    <div style={{
      minHeight: '80vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: 460, width: '100%' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '16px',
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: 900, color: '#fff',
            margin: '0 auto 12px',
            boxShadow: '0 0 30px rgba(0,153,255,0.3)',
          }}>E</div>
          <h2 style={{
            color: dark ? '#fff' : '#0a1628',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900, fontSize: '1.8rem', marginBottom: '6px',
          }}>Create Account</h2>
          <p style={{ color: dark ? '#888' : '#666', fontSize: '0.9rem' }}>
            Join EventHub for free today
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: dark ? '#0d1a28' : '#ffffff',
          border: `1px solid ${dark ? '#0f1e2e' : '#e0e0f0'}`,
          borderRadius: '20px', padding: '32px',
          boxShadow: dark
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(0,0,0,0.08)',
        }}>

          {/* Error */}
          {error && (
            <div style={{
              background: '#2a0a0a', border: '1px solid #ff4d4d',
              borderRadius: '10px', padding: '10px 14px',
              color: '#ff4d4d', fontSize: '0.85rem',
              fontFamily: "'Syne', sans-serif", marginBottom: '16px',
            }}>{error}</div>
          )}

          {/* Role Selection */}
          <label style={labelStyle}>I am signing up as</label>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '10px', marginBottom: '20px',
          }}>
            {[
              { value: 'attendee', icon: '👤', label: 'Attendee', desc: 'Browse & register for events' },
              { value: 'organizer', icon: '🏢', label: 'Organizer', desc: 'Host & manage events' },
            ].map(opt => (
              <div
                key={opt.value}
                onClick={() => setRole(opt.value)}
                style={{
                  padding: '14px', borderRadius: '12px', cursor: 'pointer',
                  border: `2px solid ${role === opt.value ? '#0099ff' : dark ? '#0f2e4e' : '#e0e0f0'}`,
                  background: role === opt.value
                    ? dark ? '#0a1e30' : '#e0f0ff'
                    : dark ? '#080d14' : '#f8faff',
                  transition: 'all 0.2s ease', textAlign: 'center',
                }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{opt.icon}</div>
                <p style={{
                  color: dark ? '#fff' : '#0a1628',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700, fontSize: '0.9rem', margin: '0 0 4px',
                }}>{opt.label}</p>
                <p style={{
                  color: dark ? '#888' : '#666',
                  fontSize: '0.75rem', margin: 0,
                }}>{opt.desc}</p>
              </div>
            ))}
          </div>

          {/* Full Name */}
          <label style={labelStyle}>Full Name</label>
          <input
            value={name} onChange={e => setName(e.target.value)}
            placeholder="Aiman" style={inputStyle}
          />

          {/* Email */}
          <label style={labelStyle}>Email</label>
          <input
            value={email} onChange={e => setEmail(e.target.value)}
            type="email" placeholder="aiman@email.com" style={inputStyle}
          />

          {/* Organization - organizers only */}
          {role === 'organizer' && (
            <>
              <label style={labelStyle}>Organization Name *</label>
              <input
                value={organization}
                onChange={e => setOrganization(e.target.value)}
                placeholder="e.g. TechCorp Pakistan"
                style={inputStyle}
              />
            </>
          )}

          {/* Password */}
          <label style={labelStyle}>Password</label>
          <PasswordInput
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            style={inputStyle}
          />

          {/* Confirm Password */}
          <label style={labelStyle}>Confirm Password</label>
          <PasswordInput
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Repeat password"
            style={inputStyle}
          />

          {/* Submit */}
          <button onClick={handleSignup} disabled={loading} style={{
            width: '100%',
            background: 'linear-gradient(135deg, #0099ff, #00e5ff)',
            color: '#fff', border: 'none', borderRadius: '12px',
            padding: '14px', cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: '1rem', marginBottom: '16px',
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>

          {/* Login Link */}
          <p style={{
            textAlign: 'center', color: dark ? '#888' : '#666',
            fontSize: '0.85rem',
          }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{
              color: '#0099ff', cursor: 'pointer', fontWeight: 700,
            }}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
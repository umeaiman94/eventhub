const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['attendee', 'organizer'], default: 'attendee' },
  organizerVerified: { type: Boolean, default: false },
  organization: { type: String, default: '' },
  location: { type: String, default: '' },
  interests: { type: [String], default: [] },
  language: { type: String, default: 'English' },
  timezone: { type: String, default: 'PKT (UTC+5)' },
  notifications: { type: Boolean, default: true },
  // Organizer subscription
  subscription: {
    active: { type: Boolean, default: false },
    plan: { type: String, default: '' },
    groupName: { type: String, default: '' },
    groupDescription: { type: String, default: '' },
    topic: { type: String, default: '' },
    location: { type: String, default: '' },
    firstEventFree: { type: Boolean, default: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  organizer: { type: String, required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, required: true },
  time: { type: String },
  location: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  banner: { type: String },
  seats: { type: Number, default: 100 },
  registered: { type: Number, default: 0 },
  formFields: { type: [String], default: ['Full Name', 'Email'] },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
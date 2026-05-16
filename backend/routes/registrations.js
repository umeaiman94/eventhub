const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// GET my registrations (protected)
router.get('/my', auth, async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user.userId });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// CREATE registration (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { eventId, eventTitle, data } = req.body;

    // Check if already registered
    const existing = await Registration.findOne({
      eventId, userId: req.user.userId,
    });
    if (existing) {
      return res.status(400).json({ message: 'Already registered.' });
    }

    // Save registration
    const registration = new Registration({
      eventId, eventTitle,
      userId: req.user.userId,
      data,
    });
    await registration.save();

    // Increment registered count on event
    await Event.findByIdAndUpdate(eventId, { $inc: { registered: 1 } });

    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
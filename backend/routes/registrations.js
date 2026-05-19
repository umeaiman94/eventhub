const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const { sendRegistrationConfirmation } = require('../emailService');

// GET my registrations (protected)
router.get('/my', auth, async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user.userId });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// GET registrations for an event (organizer only)
router.get('/event/:eventId', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    if (event.organizerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized.' });
    }
    const registrations = await Registration.find({ eventId: req.params.eventId });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// CREATE registration (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { eventId, eventTitle, data } = req.body;

    // Check duplicate by userId
    const existingByUser = await Registration.findOne({
      eventId, userId: req.user.userId,
    });
    if (existingByUser) {
      return res.status(400).json({ message: 'You have already registered for this event.' });
    }

    // Check duplicate by email
    if (data && data.Email) {
      const existingByEmail = await Registration.findOne({
        eventId, 'data.Email': data.Email,
      });
      if (existingByEmail) {
        return res.status(400).json({ message: 'This email is already registered for this event.' });
      }
    }

    const registration = new Registration({
      eventId, eventTitle,
      userId: req.user.userId,
      userEmail: req.user.email,
      data,
    });
    await registration.save();

    // Increment registered count
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $inc: { registered: 1 } },
      { new: true }
    );

    // Send confirmation email
    try {
      await sendRegistrationConfirmation({
        to: req.user.email,
        name: req.user.name,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
      });
    } catch (emailErr) {
      console.log('Email failed:', emailErr.message);
    }

    res.status(201).json(registration);

  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// DELETE registration (organizer only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: 'Registration not found.' });
    const event = await Event.findById(registration.eventId);
    if (event.organizerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized.' });
    }
    await Registration.findByIdAndDelete(req.params.id);
    await Event.findByIdAndUpdate(registration.eventId, { $inc: { registered: -1 } });
    res.json({ message: 'Registration removed.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
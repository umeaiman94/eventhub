const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendNewEventNotification } = require('../emailService');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET my events (organizer only)
router.get('/my/events', auth, async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ message: 'Organizers only.' });
    }
    const events = await Event.find({ organizerId: req.user.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// CREATE event (organizers only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ message: 'Only organizers can create events.' });
    }
    if (!req.user.organizerVerified) {
      return res.status(403).json({ message: 'Your organizer account is pending verification.' });
    }

    const event = new Event({
      ...req.body,
      organizerId: req.user.userId,
      organizer: req.user.name,
    });
    await event.save();

    // Notify users with matching interests
    try {
      const interestedUsers = await User.find({
        interests: { $in: [event.category] },
        _id: { $ne: req.user.userId },
      });
      for (const u of interestedUsers) {
        await sendNewEventNotification({
          to: u.email,
          name: u.name,
          eventTitle: event.title,
          eventCategory: event.category,
          eventDate: event.date,
          eventLocation: event.location,
          eventId: event._id,
        });
      }
    } catch (notifErr) {
      console.log('Interest notification failed:', notifErr.message);
    }

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// UPDATE event
router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    if (event.organizerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized.' });
    }
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    if (event.organizerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized.' });
    }
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
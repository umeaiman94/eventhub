const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// CREATE event (protected)
router.post('/', auth, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizerId: req.user.userId,
      organizer: req.user.name,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// UPDATE event (protected)
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
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// DELETE event (protected)
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
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
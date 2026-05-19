const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { sendOrganizerWelcome, sendAttendeeWelcome } = require('../emailService');

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, organization, location, interests } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    if (role === 'organizer' && !organization?.trim()) {
      return res.status(400).json({ message: 'Organization name is required for organizers.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name, email,
      password: hashedPassword,
      role: role || 'attendee',
      organization: organization || '',
      location: location || '',
      interests: interests || [],
      organizerVerified: true,
    });
    await user.save();

    // Send welcome email
    try {
      if (role === 'organizer') {
        await sendOrganizerWelcome({ to: email, name, organization });
      } else {
        await sendAttendeeWelcome({ to: email, name });
      }
    } catch (emailErr) {
      console.log('Welcome email failed:', emailErr.message);
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizerVerified: user.organizerVerified,
        location: user.location,
        interests: user.interests,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizerVerified: user.organizerVerified,
        organization: user.organization,
        location: user.location,
        interests: user.interests,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizerVerified: user.organizerVerified,
        location: user.location,
        interests: user.interests,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizerVerified: user.organizerVerified,
        organization: user.organization,
        location: user.location,
        interests: user.interests,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// DELETE account
router.delete('/delete', auth, async (req, res) => {
  try {
    const Registration = require('../models/Registration');
    const Event = require('../models/Event');
    await Registration.deleteMany({ userId: req.user.userId });
    await Event.deleteMany({ organizerId: req.user.userId });
    await User.findByIdAndDelete(req.user.userId);
    res.json({ message: 'Account deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

module.exports = router;
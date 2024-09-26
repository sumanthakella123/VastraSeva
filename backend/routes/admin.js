// backend/routes/admin.js

const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Booking = require('../models/Booking');
const DateModel = require('../models/DateModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminAuth = require('../middleware/auth');

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit date price or status
router.put('/dates/:dateId', adminAuth, async (req, res) => {
  const { dateId } = req.params;
  const { price, status } = req.body;

  try {
    const date = await DateModel.findByIdAndUpdate(
      dateId,
      { price, status },
      { new: true }
    );
    res.json(date);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel a booking
router.delete('/bookings/:bookingId', adminAuth, async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Update dates
    await DateModel.updateMany(
      { bookingId: booking._id },
      { status: 'Available', bookingId: null }
    );

    // Remove booking
    await Booking.findByIdAndDelete(bookingId);

    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Block a date
router.post('/dates/block', adminAuth, async (req, res) => {
  const { date, deity } = req.body;

  try {
    const dateDoc = await DateModel.findOneAndUpdate(
      { date: new Date(date), deity },
      { status: 'Blocked' },
      { new: true }
    );

    res.json(dateDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add other admin-related routes as needed

module.exports = router;

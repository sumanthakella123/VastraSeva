// backend/models/DateModel.js

const mongoose = require('mongoose');

const DateSchema = new mongoose.Schema({
  date: Date,
  deity: String, // Added to associate date with a deity
  status: { type: String, default: 'Available' }, // Available, Booked, Special, Blocked
  price: Number,
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
});

module.exports = mongoose.model('DateModel', DateSchema);

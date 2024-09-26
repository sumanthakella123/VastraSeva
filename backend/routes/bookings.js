// backend/routes/bookings.js

const express = require('express');
const router = express.Router();
const BookingService = require('../services/bookingService');
const UserService = require('../services/userService');
const DateService = require('../services/dateService');
const { v4: uuidv4 } = require('uuid');

// Create a new booking
router.post('/', async (req, res) => {
  const { name, gotram, email, phone, deity, dates } = req.body;

  try {
    // Create or find the user
    let user = await UserService.getUserById(email);
    if (!user) {
      user = {
        id: email,
        name,
        gotram,
        email,
        phone,
      };
      await UserService.createUser(user);
    }

    // Calculate total price
    const dateItems = await Promise.all(
      dates.map(async (date) => {
        const dateItem = await DateService.getDateByDeityAndDate(deity, date);
        return dateItem;
      })
    );

    const totalPrice = dateItems.reduce((sum, dateItem) => sum + dateItem.price, 0);

    // Create booking
    const booking = {
      id: uuidv4(),
      userId: user.id,
      deity,
      dates,
      totalPrice,
      paymentStatus: 'Pending',
      createdAt: new Date().toISOString(),
    };
    await BookingService.createBooking(booking);

    // Update dates status
    await Promise.all(
      dates.map(async (date) => {
        await DateService.updateDateStatus(deity, date, 'Booked', booking.id);
      })
    );

    res.status(201).json({ bookingId: booking.id, totalPrice });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

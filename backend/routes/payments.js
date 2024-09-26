// backend/routes/payments.js

const express = require('express');
const router = express.Router();
const { Client, Environment } = require('square');
const Booking = require('../models/Booking');

const client = new Client({
  environment: Environment.Sandbox, // Change to Production when ready
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

router.post('/', async (req, res) => {
  const { bookingId, sourceId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const paymentsApi = client.paymentsApi;

    const requestBody = {
      sourceId,
      idempotencyKey: require('crypto').randomUUID(),
      amountMoney: {
        amount: booking.totalPrice * 100, // Amount in cents
        currency: 'USD',
      },
    };

    const response = await paymentsApi.createPayment(requestBody);

    // Update booking payment status
    booking.paymentStatus = 'Completed';
    await booking.save();

    res.json({ message: 'Payment processed', payment: response.result.payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

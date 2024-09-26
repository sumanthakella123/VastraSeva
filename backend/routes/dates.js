// backend/routes/dates.js

const express = require('express');
const router = express.Router();
const DateService = require('../services/dateService');
const { v4: uuidv4 } = require('uuid');

// Get dates for a deity
router.get('/:deity', async (req, res) => {
  const deity = req.params.deity;

  try {
    const dates = await DateService.getDatesByDeity(deity);
    res.json(dates);
  } catch (error) {
    console.error('Error fetching dates:', error);
    res.status(500).json({ error: error.message });
  }
});

// Initialize dates for a deity
router.post('/:deity/init', async (req, res) => {
  const deity = req.params.deity;
  const { startDate, endDate, price } = req.body;

  try {
    const dates = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      dates.push({
        id: `${deity}#${dateStr}`,
        date: dateStr,
        deity,
        status: 'Available',
        price,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    await DateService.initializeDates(dates);

    res.json({ message: 'Dates initialized' });
  } catch (error) {
    console.error('Error initializing dates:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

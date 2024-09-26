// backend/routes/users.js

const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add other user-related routes as needed

module.exports = router;

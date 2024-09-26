// backend/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const dateRoutes = require('./routes/dates');
// const adminRoutes = require('./routes/admin'); // Update when ready
const paymentRoutes = require('./routes/payments'); // Update as per DynamoDB

app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/dates', dateRoutes);
// app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes); // Update as per DynamoDB

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

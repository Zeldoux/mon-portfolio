const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const contactRoutes = require('./routes/contactRoutes'); // Contact form
const projectRoutes = require('./routes/projectRoutes'); // Project-related routes
const authRoutes = require('./routes/authRoutes'); // Authentication-related routes

require('dotenv').config();

const app = express();

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Max 60 requests per IP
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req) => req.ip, // Use IP as key
});

// Contact form-specific rate limiter
const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 day
  max: 3, // Max 3 requests per day
  message: 'You have reached the daily limit for sending messages. Please try again tomorrow.',
  keyGenerator: (req) => req.ip, // Use IP as key
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Set up middleware
app.set('trust proxy', true); // Trust proxy for rate limiting and IP logging
//app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

// Apply global rate limiting to all API routes
app.use('/api', globalLimiter);

// Define routes
app.use('/api/contact', contactLimiter, contactRoutes); // Contact form routes
app.use('/api/project', projectRoutes); // Project routes
app.use('/api/auth', authRoutes); // Authentication routes

// Serve static files for the React client
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Catch-all route for React frontend
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    next(); // Let API requests be handled by the next middleware
  } else {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  }
});

module.exports = app;

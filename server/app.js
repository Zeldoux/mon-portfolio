const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const contactRoutes = require('./routes/contactRoutes');
const altchaRoutes = require('./routes/altchaRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req) => req.ip,
});

const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: 'You have reached the daily limit for sending messages. Please try again tomorrow.',
  keyGenerator: (req) => req.ip,
});

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.set('trust proxy', true);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

// Apply rate limiting to all API routes
app.use('/api', limiter);

// Routes
app.use('/api/altcha', altchaRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);

app.use('/api/project', projectRoutes);
app.use('/api/auth', authRoutes);

// Serve static files for React
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    next();
  } else {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  }
});

module.exports = app;

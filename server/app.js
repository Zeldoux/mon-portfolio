const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const path = require('path');

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();

// Fix for the X-Forwarded-For error
app.set('trust proxy', true);

app.use(limiter);

// Middleware and API routes
app.use(express.json());

// Use the CORS middleware if necessary
// app.use(cors());

app.use('/api/', limiter); // Apply rate limiting to API routes only
app.use('/api/project', projectRoutes); // Project routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/contact', contactRoutes);
app.use('/images', express.static(path.join(__dirname, 'images'))); // Static route for image files

// Serve static files for the React application
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Handle unknown routes for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;

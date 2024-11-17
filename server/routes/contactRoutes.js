const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

// ALTCHA challenge endpoint
router.get('/altcha-challenge', async (req, res) => {
  try {
    const response = await axios.get('https://api.altcha.io/challenge', {
      headers: {
        Authorization: `Bearer ${process.env.ALTCHA_API_KEY}`,
      },
    });
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(500).json({ message: 'Failed to fetch ALTCHA challenge.' });
    }
  } catch (error) {
    console.error('ALTCHA Challenge Error:', error);
    res.status(500).json({ message: 'Failed to fetch ALTCHA challenge.', error });
  }
});

// Contact form submission
router.post('/', async (req, res) => {
  const { name, email, message, altchaToken } = req.body;

  if (!name || !email || !message || !altchaToken) {
    return res.status(400).json({ message: 'Please fill out all fields and complete the CAPTCHA.' });
  }

  try {
    // ALTCHA verification
    const altchaResponse = await axios.post(
      'https://api.altcha.io/verify',
      { payload: altchaToken },
      { headers: { Authorization: `Bearer ${process.env.ALTCHA_SECRET_KEY}` } }
    );

    if (!altchaResponse.data || altchaResponse.data.state !== 'verified') {
      return res.status(403).json({ message: 'CAPTCHA verification failed.' });
    }

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      host: 'ssl0.ovh.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Portfolio Contact" <contacter-moi@ysportfolio.fr>',
      to: 'contacter-moi@ysportfolio.fr',
      subject: 'Contact From Portfolio',
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to send email.', error });
  }
});

module.exports = router;

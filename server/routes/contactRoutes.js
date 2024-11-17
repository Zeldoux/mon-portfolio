
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input (you can add more validation as needed)
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  // Configure the transporter
  let transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net', // OVH SMTP server
    port: 465, // Port for SSL
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER, // OVH email address
      pass: process.env.EMAIL_PASS, // OVH email password
    },
  });

  // Set up email data
  let mailOptions = {
    from: '"Portfolio Contacte" <contacter-moi@ysportfolio.fr>', 
    to: 'contacter-moi@ysportfolio.fr', 
    subject: 'Contact Depuis le PortFolio',
    text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>${message}</p>
    `,
    replyTo: email, // 
  };

  // Send mail
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.', error });
  }
});

module.exports = router;

const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'ssl0.ovh.net', // OVH SMTP server
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.', error });
  }
};

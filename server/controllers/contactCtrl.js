const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Function to verify the ALTCHA payload
const verifyAltchaPayload = (payload, secretKey) => {
  const { algorithm, challenge, number, salt, signature } = payload;

  if (algorithm !== 'SHA-256') {
    console.error('Unsupported algorithm:', algorithm);
    return false;
  }

  // Verify the challenge
  const computedChallenge = crypto
    .createHash('sha256')
    .update(`${salt}${number}`)
    .digest('hex');

  if (challenge !== computedChallenge) {
    console.error('Invalid challenge');
    return false;
  }

  // Verify the signature
  const computedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(challenge)
    .digest('hex');

  if (signature !== computedSignature) {
    console.error('Invalid signature');
    return false;
  }

  return true;
};

exports.sendEmail = async (req, res) => {
  const { name, email, message, altchaToken } = req.body;

  if (!altchaToken) {
    return res.status(400).json({ message: 'ALTCHA token is missing.' });
  }

  try {
    // Decode and verify the payload
    const payload = JSON.parse(Buffer.from(altchaToken, 'base64').toString('utf-8'));
    const secretKey = process.env.ALTCHA_API_SECRET; // Ensure this is set in .env

    if (!verifyAltchaPayload(payload, secretKey)) {
      return res.status(400).json({ message: 'Invalid ALTCHA payload.' });
    }

    // Send email via nodemailer
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

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).json({ message: 'Failed to send email.', error });
  }
};

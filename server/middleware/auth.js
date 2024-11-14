// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      console.error('No Authorization header found');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log('Received token:', token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: decodedToken.userId };

    console.log('Authenticated userId:', req.auth.userId);

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

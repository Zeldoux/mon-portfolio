const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactCtrl');
const altchaMiddleware = require('../middleware/altchaMiddleware'); // Adjust path as needed

router.post('/', altchaMiddleware.verifyAltchaSolution, contactController.sendEmail);

module.exports = router;

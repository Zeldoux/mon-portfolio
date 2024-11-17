const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactCtrl');

router.post('/', contactController.sendEmail);

module.exports = router;

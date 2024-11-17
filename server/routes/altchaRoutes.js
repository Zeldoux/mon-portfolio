const express = require('express');
const router = express.Router();
const altchaController = require('../controllers/altchaCtrl');

router.get('/altcha-challenge', altchaController.getChallenge);

module.exports = router;
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/payment-details', paymentController.processPayment);

module.exports = router;

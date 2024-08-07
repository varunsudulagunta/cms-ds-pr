// src/routes/paymentRoutes.js

const express = require('express');
const paymentController = require('../controllers/paymentController');
const { validatePaymentCreate } = require('../middleware/validateRequest');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/', validatePaymentCreate, asyncHandler(paymentController.createPayment));
router.get('/', asyncHandler(paymentController.getPayments));
router.get('/:id', asyncHandler(paymentController.getPayment));
router.put('/:id', validatePaymentCreate, asyncHandler(paymentController.updatePayment));
router.delete('/:id', asyncHandler(paymentController.deletePayment));

module.exports = router;

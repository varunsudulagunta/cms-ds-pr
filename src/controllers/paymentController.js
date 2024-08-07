const Payment = require('../models/payment');
const asyncHandler = require('../utils/asyncHandler');
const logger = require('../utils/logger');

exports.createPayment = asyncHandler(async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    logger.info('Payment created successfully', { paymentId: payment._id });
    res.status(201).json({ message: 'Payment Created', _id:  payment._id });
  } catch (error) {
    logger.error('Error creating payment', { error });
    res.status(500).json({ message: 'Server Error' });
  }
});

exports.getPayments = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const payments = await Payment.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Payment.countDocuments();
    logger.info('Payments retrieved successfully', { count });

    res.status(200).json({
      payments,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalPayments: parseInt(count)
    });
  } catch (error) {
    logger.error('Error retrieving payments', { error });
    res.status(500).json({ message: 'Server Error' });
  }
});

exports.getPayment = asyncHandler(async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    logger.error('Error retrieving payment', { error });
    res.status(500).json({ message: 'Server Error' });
  }
});

exports.updatePayment = asyncHandler(async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    logger.info('Payment updated successfully', { paymentId: payment._id });
    res.status(200).json(payment);
  } catch (error) {
    logger.error('Error updating payment', { error });
    res.status(500).json({ message: 'Server Error' });
  }
});

exports.deletePayment = asyncHandler(async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    logger.info('Payment deleted successfully', { paymentId: payment._id });
    res.status(200).json({ message: 'Payment deleted' });
  } catch (error) {
    logger.error('Error deleting payment', { error });
    res.status(500).json({ message: 'Server Error' });
  }
});

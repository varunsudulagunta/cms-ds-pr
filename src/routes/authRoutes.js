const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const { getCode, getToken } = require('../services/eburyService');
const logger = require('../utils/logger');

router.post('/get-code', asyncHandler(async (req, res) => {
  const code = await getCode();
  logger.info('Authorization code retrieved successfully', { code });
  res.status(200).json({ code });
}));

router.post('/get-token', asyncHandler(async (req, res) => {
  const { code } = req.body;
  if (!code) {
    res.status(400).json({ message: 'Code is required' });
    return;
  }

  const tokenData = await getToken(code);
  logger.info('Access token retrieved successfully', { tokenData });
  res.status(200).json(tokenData);
}));

module.exports = router;

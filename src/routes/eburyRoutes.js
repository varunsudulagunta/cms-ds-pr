

const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const { validateBalanceRetrieval, validateEstimateQuote, validateFirmQuote } = require('../middleware/validateRequest');
const { getAllBalance, getAllClientAccounts, getCode, getToken, getAllBeneficiaries, getEstimateQuote, getFirmQuote } = require('../services/eburyService');

router.post('/balances', validateBalanceRetrieval, asyncHandler(getAllBalance));

router.post('/client-accounts', validateBalanceRetrieval, asyncHandler(getAllClientAccounts));

router.post('/beneficiaries', validateBalanceRetrieval, asyncHandler(getAllBeneficiaries));

router.post('/get-estimate-quote', validateEstimateQuote, asyncHandler(getEstimateQuote));

router.post('/get-firm-quote', validateFirmQuote, asyncHandler(getFirmQuote));

router.post('/get-code', asyncHandler(async (req, res) => {
    const code = await getCode();
    res.status(200).json({ code });
}));

router.post('/get-token', asyncHandler(async (req, res) => {
    const { code } = req.body;
    if (!code) {
        res.status(400).json({ message: 'Code is required' });
        return;
    }

    const tokenData = await getToken(code);
    res.status(200).json(tokenData);
}));

module.exports = router;
const { body, validationResult } = require('express-validator');

const validatePaymentCreate = [
  body('trustAccountDetails.fintechPartner')
    .isString().withMessage('fintechPartner must be a string')
    .notEmpty().withMessage('fintechPartner cannot be empty'),

  body('trustAccountDetails.fintechClientId')
    .isString().withMessage('fintechClientId must be a string')
    .notEmpty().withMessage('fintechClientId cannot be empty')
    .isLength({ min: 8 }).withMessage('fintechClientId must be at least 8 characters long'),

  body('trustAccountDetails.iban')
    .isString().withMessage('iban must be a string')
    .notEmpty().withMessage('iban cannot be empty')
    .matches(/^GB\d{2}[A-Z]{4}\d{14}$/).withMessage('Invalid IBAN format'),

  body('trustAccountDetails.accountNo')
    .isString().withMessage('accountNo must be a string')
    .notEmpty().withMessage('accountNo cannot be empty')
    .isLength({ min: 8, max: 10 }).withMessage('accountNo must be between 8 and 10 characters long'),

  // Validate agent
  body('agent.agentId')
    .isUUID().withMessage('agentId must be a valid UUID'),

  body('agent.providerType')
    .isString().withMessage('providerType must be a string')
    .notEmpty().withMessage('providerType cannot be empty'),

  body('agent.caseSystemId')
    .isString().withMessage('caseSystemId must be a string')
    .notEmpty().withMessage('caseSystemId cannot be empty'),

  // Validate agent.general
  body('agent.general.name')
    .isString().withMessage('name must be a string')
    .notEmpty().withMessage('name cannot be empty'),

  body('agent.general.agentCode')
    .isString().withMessage('agentCode must be a string')
    .notEmpty().withMessage('agentCode cannot be empty')
    .isUUID().withMessage('agentCode must be a valid UUID'),

  // Validate agentBankDetails
  body('agent.agentBankDetails.accountNo')
    .isString().withMessage('accountNo must be a string')
    .notEmpty().withMessage('accountNo cannot be empty')
    .isLength({ min: 8 }).withMessage('accountNo must be at least 8 characters long'),

  body('agent.agentBankDetails.beneficiaryName')
    .isString().withMessage('beneficiaryName must be a string')
    .notEmpty().withMessage('beneficiaryName cannot be empty'),

  body('agent.agentBankDetails.country')
    .isString().withMessage('country must be a string')
    .notEmpty().withMessage('country cannot be empty'),

  body('agent.agentBankDetails.bicSwiftCode')
    .isString().withMessage('bicSwiftCode must be a string')
    .notEmpty().withMessage('bicSwiftCode cannot be empty')
    .matches(/^[A-Z]{6}[A-Z0-9]{2}(?:[A-Z0-9]{3})?$/).withMessage('Invalid BIC/SWIFT code format'),

  body('agent.agentBankDetails.ibanNo')
    .isString().withMessage('ibanNo must be a string')
    .notEmpty().withMessage('ibanNo cannot be empty'),

  body('agent.agentBankDetails.abaNumber')
    .isString().withMessage('abaNumber must be a string')
    .notEmpty().withMessage('abaNumber cannot be empty')
    .matches(/^\d{9}$/).withMessage('Invalid ABA number format'),

  body('agent.agentBankDetails.bankName')
    .isString().withMessage('bankName must be a string')
    .notEmpty().withMessage('bankName cannot be empty'),

  body('agent.agentBankDetails.branch')
    .isString().withMessage('branch must be a string')
    .notEmpty().withMessage('branch cannot be empty'),

  body('agent.agentBankDetails.bankAddress')
    .isString().withMessage('bankAddress must be a string')
    .notEmpty().withMessage('bankAddress cannot be empty'),

  body('agent.agentBankDetails.firstCorrespondent')
    .isString().withMessage('firstCorrespondent must be a string')
    .notEmpty().withMessage('firstCorrespondent cannot be empty'),

  body('agent.agentBankDetails.firstCorrSwift')
    .isString().withMessage('firstCorrSwift must be a string')
    .notEmpty().withMessage('firstCorrSwift cannot be empty'),

  body('agent.agentBankDetails.firstCorrAba')
    .isString().withMessage('firstCorrAba must be a string')
    .notEmpty().withMessage('firstCorrAba cannot be empty'),

  body('agent.agentBankDetails.secondCorrespondent')
    .optional().isString().withMessage('secondCorrespondent must be a string'),

  body('agent.agentBankDetails.secondCorrSwift')
    .optional().isString().withMessage('secondCorrSwift must be a string'),

  body('agent.agentBankDetails.secondCorrAba')
    .optional().isString().withMessage('secondCorrAba must be a string'),

  body('agent.agentBankDetails.city')
    .isString().withMessage('city must be a string')
    .notEmpty().withMessage('city cannot be empty'),

  body('agent.agentBankDetails.currency')
    .isString().withMessage('currency must be a string')
    .notEmpty().withMessage('currency cannot be empty'),

  body('agent.agentBankDetails.paymentRef')
    .optional().isString().withMessage('paymentRef must be a string'),
  body('currency')
    .isString()
    .withMessage('Currency must be a string')
    .not()
    .isEmpty()
    .withMessage('Currency is required'),
  body('balanceAmountDueToAgent')
    .isFloat({ min: 0 }).withMessage('balanceAmountDueToAgent must be a non-negative number'),

  body('valueToBePaid')
    .isFloat({ min: 0 }).withMessage('valueToBePaid must be a non-negative number'),

  body('valueDate')
    .isISO8601().withMessage('valueDate must be in the format YYYY-MM-DD')
    .custom(value => {
      const [year, month, day] = value.split('-').map(Number);
      if (month < 1 || month > 12 || day < 1 || day > 31) {
        throw new Error('valueDate contains an invalid date');
      }
      return true;
    }),

  body('portcallNo')
    .isString().withMessage('portcallNo must be a string')
    .notEmpty().withMessage('portcallNo cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateBalanceRetrieval = [
  body('access_token')
    .not()
    .isEmpty()
    .withMessage('Access Token is required'),
  body('client_id')
  .not()
  .isEmpty()
  .withMessage('Client Id is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateEstimateQuote = [
  body('access_token')
    .not()
    .isEmpty()
    .withMessage('Access Token is required'),
  body('client_id')
    .not()
    .isEmpty()
  .withMessage('Client Id is required'),
  body('buy')
    .not()
    .isEmpty()
    .withMessage('Buy currency is required'),
  body('sell')
    .not()
    .isEmpty()
    .withMessage('Sell currency is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateFirmQuote = [
  body('access_token')
    .not()
    .isEmpty()
    .withMessage('Access Token is required'),
  body('client_id')
    .not()
    .isEmpty()
  .withMessage('Client Id is required'),
  body('buy')
    .not()
    .isEmpty()
    .withMessage('Buy currency is required'),
  body('sell')
    .not()
    .isEmpty()
    .withMessage('Sell currency is required'),
    body('valueDate')
      .not()
      .isEmpty()
      .withMessage('Value Date is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]
module.exports = {
  validatePaymentCreate,
  validateBalanceRetrieval,
  validateEstimateQuote,
  validateFirmQuote
};

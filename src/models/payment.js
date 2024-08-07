const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
  account_number: String,
  amount: Number,
  authorisation_workflow: String,
  authorised_by: String,
  authorised_date: Date,
  bank_identifier: String,
  beneficiary_name: String,
  cancelled_by: String,
  cancelled_date: Date,
  contact_id: String,
  created_date: Date,
  fee_amount: Number,
  fee_currency: String,
  iban: String,
  invoice_required: Boolean,
  payment_currency: String,
  payment_date: Date,
  payment_id: String,
  payment_instruction: String,
  payment_receipt: String,
  reference: String,
  rejected_by: String,
  rejected_date: Date,
  status: String,
  swift_code: String,
  trade_id: String
}, { _id: false });

const EventSchema = new Schema({
  status: String,
  data: DataSchema
}, { _id: false });

const TradeSchema = new Schema({
  fee_amount: Number,
  fee_currency: String,
  payment_id: String,
  payment_instruction: String,
  payment_receipt: String,
  reference: String,
  status: String
}, { _id: false });

const QuoteSchema = new Schema({
  book_trade: String,
  buy_amount: Number,
  buy_currency: String,
  inverse_rate: Number,
  inverse_rate_symbol: String,
  quote_id: String,
  quoted_rate: Number,
  quoted_rate_symbol: String,
  sell_amount: Number,
  sell_currency: String,
  value_date: Date,
  warning: String
}, { _id: false });

const TrustAccountDetailsSchema = new Schema({
  fintechPartner: String,
  fintechClientId: String,
  iban: String,
  accountNo: String
}, { _id: false });

const AgentBankDetailsSchema = new Schema({
  accountNo: String,
  beneficiaryName: String,
  country: String,
  bicSwiftCode: String,
  ibanNo: String,
  abaNumber: String,
  bankName: String,
  branch: String,
  bankAddress: String,
  firstCorrespondent: String,
  firstCorrSwift: String,
  firstCorrAba: String,
  secondCorrespondent: String,
  secondCorrSwift: String,
  secondCorrAba: String,
  city: String,
  currency: String,
  paymentRef: String
}, { _id: false });

const AgentGeneralSchema = new Schema({
  name: String,
  agentCode: String
}, { _id: false });

const AgentSchema = new Schema({
  agentId: String,
  providerType: String,
  caseSystemId: String,
  general: AgentGeneralSchema,
  agentBankDetails: AgentBankDetailsSchema
}, { _id: false });

const TierSchema = new Schema({
  approvalStatus: Boolean,
  isAutoApprove: Boolean,
  usersList: [String],
  userIds: Map,
  tierSequence: Number,
  dept: [Schema.Types.Mixed] // Assuming dept will have a similar complex structure
}, { _id: false });

const CostHeadSchema = new Schema({
  costHeadId: String,
  costHeadName: String,
  content: [Schema.Types.Mixed] // Assuming content will have a similar complex structure
}, { _id: false });

const MainSchema = new Schema({
  owner: String,
  exchangeRate: String,
  dateOfAppointment: Date,
  diabosReference: String,
  portcallUniqueId: String,
  vessel: String,
  imoNumber: String,
  voyage: String,
  port: String,
  portId: String,
  arrivalDate: Date,
  sailingDate: Date,
  approvalDate: Date,
  country: String,
  countryId: String,
  portCallArrangedBy: String,
  pdaApprovedBy: String,
  invoiceDate: Date,
  invoiceNumber: String,
  fdaFullAmount: String,
  tier: [TierSchema],
  currency: String,
  totalAmountRemitted: Number,
  remittedCurrency: String,
  paymentRequiredIn: String,
  costhead: [CostHeadSchema],
  advanceApproved: Number,
  balanceAmountDueToAgent: Number,
  valueToBePaid: Number,
  valueDate: String,
  vesselCaseSystemId: String,
  portcallId: String,
  portcallNo: String,
  vesselId: String,
  legalentityid: String,
  legalentityname: String,
  agent: AgentSchema,
  idacheckingrequiredcall: Boolean,
  attachedDocs: [Schema.Types.Mixed],
  paymentAdviceType: String,
  ownerId: String,
  exchangedRate: String,
  status: String,
  trustAccountId: String,
  accountNo: String,
  ibanNo: String,
  isVmsPortcall: Boolean,
  eventSeq: String,
  executionDate: String,
  paymentDate: String,
  trustAccountDetails: TrustAccountDetailsSchema,
  subStatus: String,
  mergeId: String,
  paymentReference: String,
  makePaymentDate: Date,
  quote: QuoteSchema,
  trade: [TradeSchema],
  trade_id: String,
  events: [EventSchema],
  fintechStatus: String,
  apiAuthorized: Boolean
});

const Payment = mongoose.model('Payment', MainSchema);

module.exports = Payment;

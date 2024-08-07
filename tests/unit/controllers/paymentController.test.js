const request = require('supertest');
const express = require('express');
const paymentRoutes = require('../../../src/routes/paymentRoutes');
const { setupDatabase, teardownDatabase } = require('../../utils/testHelpers');

const app = express();
app.use(express.json());
app.use('/api/payment', paymentRoutes);

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
});

describe('Payment Controller', () => {
  let paymentId;

  it('should create a new payment', async () => {
    const res = await request(app)
      .post('/api/payment/')
      .send(payment);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    paymentId = res.body._id;
  });

  it('should get payments with pagination', async () => {
    const res = await request(app).get('/api/payment/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('payments');
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('currentPage');
  });

  it('should get a single payment', async () => {
    const res = await request(app).get(`/api/payment/${paymentId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', paymentId);
  });

  it('should update a payment', async () => {
    const res = await request(app)
      .put(`/api/payment/${paymentId}`)
      .send(payment);

    expect(res.statusCode).toEqual(200);
  });

  it('should delete a payment', async () => {
    const res = await request(app).delete(`/api/payment/${paymentId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Payment deleted');
  });
});

const payment = {
  "owner": "Honda",
  "exchangeRate": "1.3",
  "dateOfAppointment": "2023-06-20T06:32:34.844Z",
  "diabosReference": "d095fa08-b0ee-40da-9703-b3d8979e7f9e",
  "portcallUniqueId": "",
  "vessel": "Tata Shipment pvt ltd",
  "imoNumber": "26456",
  "voyage": "1007",
  "port": "Sibu, Sarawak",
  "portId": "f4ec2ac6-ea54-4b80-9cc3-c53a77d5d653",
  "arrivalDate": "2023-06-20T06:31:40.639Z",
  "sailingDate": "2023-06-22T06:31:42.000Z",
  "approvalDate": "2023-06-20T06:36:30.711Z",
  "country": "India",
  "countryId": "91",
  "portCallArrangedBy": "diabosdevadmin@yopmail.com",
  "pdaApprovedBy": "CMA CGM agent",
  "invoiceDate": "2023-06-20T06:33:09.754Z",
  "invoiceNumber": "",
  "fdaFullAmount": "400",
  "tier": [],
  "currency": "EUR",
  "totalAmountRemitted": 0,
  "remittedCurrency": "USD",
  "paymentRequiredIn": "USD",
  "costhead": [],
  "advanceApproved": 280,
  "balanceAmountDueToAgent": 0,
  "valueToBePaid": 280,
  "valueDate": "2024-09-20",
  "vesselCaseSystemId": "5jb6d6t4mz861h53io2gyhxo0",
  "portcallId": "f29e7e2b-abf2-47f0-ae36-293b05d7309e",
  "portcallNo": "HND240808",
  "vesselId": "e437e934-96c8-4f39-92cd-02916d8ee733",
  "legalentityid": "6e57e0af-df67-4ac3-b6f8-c00ee23fbecc",
  "legalentityname": "Honda",
  "agent": {
    "agentId": "9de4f806-446f-4f93-9455-5b9e93f87713",
    "providerType": "agent",
    "caseSystemId": "5jb7m6pgv3sq1h4vxtmuatiag",
    "general": {
      "name": "CMA CGM agent",
      "agentCode": "9de4f806-446f-4f93-9455-5b9e93f87713"
    },
    "agentBankDetails": {
      "accountNo": "52232487",
      "beneficiaryName": "Charles",
      "country": "India",
      "bicSwiftCode": "DABANO22SKE",
      "ibanNo": "NO4052952232487",
      "abaNumber": "123456789",
      "bankName": "Charles Hardy",
      "branch": "Mumbai",
      "bankAddress": "Mumbai",
      "firstCorrespondent": "Charles",
      "firstCorrSwift": "DABANO22SKE",
      "firstCorrAba": "123456789",
      "secondCorrespondent": "",
      "secondCorrSwift": "",
      "secondCorrAba": "",
      "city": "Mumbai",
      "currency": "784fef4d-e26d-48c7-aa88-279b5aa94829",
      "paymentRef": ""
    }
  },
  "idacheckingrequiredcall": true,
  "attachedDocs": [],
  "paymentAdviceType": "PDA",
  "ownerId": "329b9ae3-398c-435a-b34d-3351bb1af9e4",
  "exchangedRate": "1.3",
  "status": "advancePayment",
  "trustAccountId": "EBPCLI285261",
  "accountNo": "65878033",
  "ibanNo": "GB57BARC20060565878033",
  "isVmsPortcall": false,
  "eventSeq": "2",
  "executionDate": "2023/06/20",
  "paymentDate": "2023/06/20",
  "trustAccountDetails": {
    "fintechPartner": "Ebury",
    "fintechClientId": "EBPCLI285261",
    "iban": "GB57BARC20060565878033",
    "accountNo": "65878033"
  },
  "subStatus": "sentToAuthorizer",
  "mergeId": "7d69b383-392c-44af-9ac6-06a1ef3e2956",
  "paymentReference": "",
  "makePaymentDate": "2023-06-20T12:15:08.955Z",
  "quote": {
    "book_trade": "/trades?client_id=EBPCLI285261&quote_id=d35bd0c19a95a0b56cd7081d7a107f6c",
    "buy_amount": 280,
    "buy_currency": "USD",
    "inverse_rate": 0.916701,
    "inverse_rate_symbol": "USDEUR",
    "quote_id": "d35bd0c19a95a0b56cd7081d7a107f6c",
    "quoted_rate": 1.090868,
    "quoted_rate_symbol": "EURUSD",
    "sell_amount": 256.68,
    "sell_currency": "EUR",
    "value_date": "2023-06-20",
    "warning": "Invalid date 2016-09-20. TRADE DATE HAS BEEN CHANGED TO NEXT AVAILABLE DATE 2023-06-20"
  },
  "trade": [
    {
      "fee_amount": 0,
      "fee_currency": "EUR",
      "payment_id": "PI83836",
      "payment_instruction": "/documents?type=pi&id=PI83836&client_id=EBPCLI285261",
      "payment_receipt": "/documents?type=pr&id=PI83836&client_id=EBPCLI285261",
      "reference": "HND2303402",
      "status": "Validating beneficiary information"
    }
  ],
  "trade_id": "EBPOTR029914",
  "events": [
    {
      "status": "PENDING_OF_AUTHORIZATION",
      "data": {
        "account_number": "",
        "amount": 280,
        "authorisation_workflow": "4-eyes",
        "authorised_by": null,
        "authorised_date": null,
        "bank_identifier": "",
        "beneficiary_name": "Charles Hardy",
        "cancelled_by": null,
        "cancelled_date": null,
        "contact_id": "DEMOCON296",
        "created_date": "2023-06-20",
        "fee_amount": 0,
        "fee_currency": "EUR",
        "iban": "NO4052952232487",
        "invoice_required": false,
        "payment_currency": "USD",
        "payment_date": "2023-06-20",
        "payment_id": "PI83836",
        "payment_instruction": "/documents?type=pi&id=PI83836&client_id=EBPCLI285261",
        "payment_receipt": "/documents?type=pr&id=PI83836&client_id=EBPCLI285261",
        "reference": "HND2303402",
        "rejected_by": null,
        "rejected_date": null,
        "status": "Validating beneficiary information",
        "swift_code": "DABANO22SKE",
        "trade_id": null
      }
    },
    {
      "status": "CREATED",
      "data": {
        "account_number": "",
        "amount": 280,
        "authorisation_workflow": "4-eyes",
        "authorised_by": null,
        "authorised_date": null,
        "bank_identifier": "",
        "beneficiary_name": "Charles Hardy",
        "cancelled_by": null,
        "cancelled_date": null,
        "contact_id": "DEMOCON296",
        "created_date": "2023-06-20",
        "fee_amount": 0,
        "fee_currency": "EUR",
        "iban": "NO4052952232487",
        "invoice_required": false,
        "payment_currency": "USD",
        "payment_date": "2023-06-20",
        "payment_id": "PI83836",
        "payment_instruction": "/documents?type=pi&id=PI83836&client_id=EBPCLI285261",
        "payment_receipt": "/documents?type=pr&id=PI83836&client_id=EBPCLI285261",
        "reference": "HND2303402",
        "rejected_by": null,
        "rejected_date": null,
        "status": "Validating beneficiary information",
        "swift_code": "DABANO22SKE",
        "trade_id": null
      }
    },
    {
      "status": "AUTHORIZED",
      "data": {
        "account_number": "",
        "amount": 280,
        "authorisation_workflow": "4-eyes",
        "authorised_by": "DEMOCON351",
        "authorised_date": "20230620",
        "bank_identifier": "",
        "beneficiary_name": "Charles Hardy",
        "cancelled_by": null,
        "cancelled_date": null,
        "contact_id": "DEMOCON296",
        "created_date": "2023-06-20",
        "fee_amount": 0,
        "fee_currency": "EUR",
        "iban": "NO4052952232487",
        "invoice_required": false,
        "payment_currency": "USD",
        "payment_date": "2023-06-20",
        "payment_id": "PI83836",
        "payment_instruction": "/documents?type=pi&id=PI83836&client_id=EBPCLI285261",
        "payment_receipt": "/documents?type=pr&id=PI83836&client_id=EBPCLI285261",
        "reference": "HND2303402",
        "rejected_by": null,
        "rejected_date": null,
        "status": "Validating beneficiary information",
        "swift_code": "DABANO22SKE",
        "trade_id": "EBPOTR029914"
      }
    }
  ],
  "fintechStatus": "AUTHORIZED",
  "apiAuthorized": true
}

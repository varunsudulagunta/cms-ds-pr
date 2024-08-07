const request = require('supertest');
const express = require('express');
const eburyRoutes = require('../../../src/routes/eburyRoutes');
const { EBURY_ACCOUNT_ID } = require('../../../src/config/environment');

// jest.mock('../../src/services/eburyService');

const app = express();
app.use(express.json());
app.use('/api/ebury', eburyRoutes);

describe('Ebury Routes', () => {

    let mockCode;
    let mockToken;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  
  test('POST /ebury/get-code - success', async () => {
    const response = await request(app).post('/api/ebury/get-code').send();
    expect(response.statusCode).toBe(200);
    mockCode = response.body.code;
  });

  test('POST /ebury/get-token - success', async () => {
    const response = await request(app).post('/api/ebury/get-token').send({ code: mockCode });
    expect(response.statusCode).toBe(200);
    mockToken = response.body.access_token;
  });

  test('POST /ebury/get-token - failure (no code)', async () => {
    const response = await request(app).post('/api/ebury/get-token').send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: 'Code is required' });
  });

  test('POST /ebury/balances - success', async () => {
    const response = await request(app).post('/api/ebury/balances').send({ client_id: EBURY_ACCOUNT_ID, access_token: mockToken });
    expect(response.statusCode).toBe(200);
  });

  test('POST /ebury/beneficiaries - success', async () => {
    const response = await request(app).post('/api/ebury/beneficiaries').send({ client_id: EBURY_ACCOUNT_ID, access_token: mockToken });
    expect(response.statusCode).toBe(200);
  });

  test('POST /ebury/get-estimate-quote - success', async () => {
    const response = await request(app).post('/api/ebury/get-estimate-quote').send({ client_id: EBURY_ACCOUNT_ID, buy: 'USD', sell: 'EUR', access_token: mockToken });
    expect(response.statusCode).toBe(200);
  }, 10000);

  test('POST /ebury/get-firm-quote - success', async () => {
    const response = await request(app).post('/api/ebury/get-firm-quote').send({ client_id: EBURY_ACCOUNT_ID, buy: 'USD', sell: 'EUR', access_token: mockToken, valueDate: '2024-08-07' });
    expect(response.statusCode).toBe(200);
  }, 10000);

});

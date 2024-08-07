const axios = require('axios');
const { EBURY_API_URL, EBURY_CLIENT_ID, EBURY_CLIENT_SECRET,EBURY_AUTH_URL, EBURY_ACCOUNT_EMAIL,EBURY_ACCOUNT_PASSWORD } = require('../config/environment');
const logger = require('../utils/logger');

class EburyService {
  constructor() {
    this.apiUrl = EBURY_API_URL;
    this.clientId = EBURY_CLIENT_ID;
    this.clientSecret = EBURY_CLIENT_SECRET;
    this.authUrl = EBURY_AUTH_URL
  }

  getCode = async () => {
    if (!this.apiUrl || !this.clientId || !this.clientSecret) {
      logger.error('Missing required environment variables:');
      throw new Error('Missing required environment variables');
    }
    const details = {
      email: EBURY_ACCOUNT_EMAIL,
      password: EBURY_ACCOUNT_PASSWORD,
      client_id: this.clientId,
      state: "1234"
    };

    const formBody = Object.keys(details).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`).join('&');
  
    try {
      const result = await fetch(`${this.authUrl}/login`, {
        redirect: "manual",
        mode: "cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });
      const response = await result.text();
      const urlRegex = /(https?:\/\/[^ ]*)(.*?)(?=\")/;
      const url = response.match(urlRegex)[1];
      const code = url.match(new RegExp("code=" + "(.*)" + "&"))[1];
  
      return code;
    } catch (error) {
      logger.error('Error in authController(getCode):', error);
      throw new Error('Failed to get authorization code');
    }
  }
  
  getToken = async (code) => {
    const token = `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`;
    const headers = {
      "Authorization": token,
      "Content-Type": "application/x-www-form-urlencoded"
    };
    const body = {
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": "http://diabos.biz/"
    };
  
    try {
      const result = await axios.post(this.authUrl+'/token', new URLSearchParams(body), { headers });
      return result.data;
    } catch (error) {
      logger.error('Error in authController(getToken):', error);
      throw new Error('Failed to get access token');
    }
  }

  getClientBalance = async (access_token, client_id) => {
    try {
      const token = `Bearer ${access_token}`;
      const headers = { Authorization: token };
      const result = await axios.get(`${this.apiUrl}balances?client_id=${client_id}`, { headers });
      return result.data;
    } catch (error) {
      logger.error('Error in getClientBalance:', error);
      throw error;
    }
  };
  
  getAllBalance = async (req, res, next) => {
    try {
      const result = [];
      const balance = {
        client_name: "",
        client_id: req.body.client_id,
        balance: await this.getClientBalance(req.body.access_token, req.body.client_id),
      };
      result.push(balance);
      res.status(200).json(result);
    } catch (error) {
      logger.error('eburyService(getAllBalance) Error retreiving balances:', error);
      res.status(500).json("Error retreiving balances");
    }
  };
  
  getClientAccounts = async (access_token, client_id) => {
    try {
      const token = `Bearer ${access_token}`;
      const headers = { Authorization: token };
      const result = await axios.get(`${this.apiUrl}/accounts?client_id=${client_id}`, { headers });
      return result.data;
    } catch (error) {
      logger.error('Error in getClientAccounts:', error);
      throw error;
    }
  };
  
  getAllClientAccounts = async (access_token, client_ids) => {
    const result = [];
    for (const element of client_ids) {
      const account = {
        client_name: element.client_name,
        client_id: element.client_id,
        account: await this.getClientAccounts(access_token, element.client_id),
      };
      result.push(account);
    }
    return result;
  };
  
  getAllAccounts = async (access_token, client_id) => {
    try {
      const token = `Bearer ${access_token}`;
      const headers = { Authorization: token };
      const result = await axios.get(`${this.apiUrl}/accounts?client_id=${client_id}`, { headers });
      return result.data;
    } catch (error) {
      logger.error('Error in getAllAccounts:', error);
      throw error;
    }
  };
  
  getAllBeneficiaries = async (req, res, next) => {
    try {
      const token = `Bearer ${req.body.access_token}`;
      const headers = { Authorization: token };
      const result = await axios.get(`${this.apiUrl}/beneficiaries?client_id=${req.body.client_id}`, { headers });
      res.status(200).json(result.data);
    } catch (error) {
      logger.error('Error in getAllBeneficiaries:', error);
      res.status(500).json("Error retreiving beneficiaries");
    }
  };
  
  getBeneficiaries = async (access_token, client_id, iban) => {
    try {
      const token = `Bearer ${access_token}`;
      const headers = { Authorization: token };
      const result = await axios.get(`${this.apiUrl}/beneficiaries?client_id=${client_id}&iban=${iban}`, { headers });
      res.status(200).json(result.data);
    } catch (error) {
      logger.error('Error in getBeneficiaries:', error);
      res.status(500).json("Error retreiving beneficiaries");
    }
  };
  
  getEstimateQuote = async (req, res, next) => {
    try {
      const token = `Bearer ${req.body.access_token}`;
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const body = {
        trade_type: 'spot',
        buy_currency: req.body.buy,
        amount: 1,
        operation: 'buy',
        sell_currency: req.body.sell,
      };
      const result = await axios.post(`${this.apiUrl}quotes?quote_type=estimate&client_id=${req.body.client_id}`, body, { headers });
      res.status(200).json(result.data);
    } catch (error) {
      logger.error('Error in getEstimateQuote:', error);
      res.status(500).json("Error retreiving Estimate Quote");
    }
  };
  
  getFirmQuote = async (req, res, next) => {
    try {
      const token = `Bearer ${req.body.access_token}`;
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const body = {
        trade_type: 'spot',
        buy_currency: req.body.buy,
        amount: 1,
        operation: 'buy',
        sell_currency: req.body.sell,
        value_date: req.body.value_date,
      };
      const result = await axios.post(`${this.apiUrl}/quotes?quote_type=quote&client_id=${req.body.client_id}`, body, { headers });
      res.status(200).json(result.data);
    } catch (error) {
      logger.error('Error in getFirmQuote:', error);
      res.status(500).json("Error retreiving Firm Quote");
    }
  };
}

module.exports = new EburyService();
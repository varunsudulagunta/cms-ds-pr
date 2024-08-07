const mongoose = require('mongoose');
const { MONGODB_URI } = require('./environment');
const logger = require('../utils/logger');

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logger.info('MongoDB connected successfully');
      resolve();
    })
    .catch((error) => {
      logger.error('MongoDB connection error:', error);
      reject(error);
    });
  });
};

module.exports = connectDB;
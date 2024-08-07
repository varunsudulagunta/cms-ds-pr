const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const { PORT } = require('./config/environment');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const eburyRoutes = require('./routes/eburyRoutes');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimiter);

app.use('/api', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/ebury', eburyRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB().then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }).catch((error) => {
      console.error('Failed to connect to the database. Server not started.', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to connect to the database. Server not started.', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
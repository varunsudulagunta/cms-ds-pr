const mongoose = require('mongoose');
// const { DATABASE_NAME } = require('./environment');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const setupDatabase = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // dbName: DATABASE_NAME
  });
};

const teardownDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

module.exports = {
  setupDatabase,
  teardownDatabase
};

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const optionsDB = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  retryWrites: true,
  authSource: 'admin',
};
const urlDB = 'mongodb://admin:admin@127.0.0.1:27017/shop';

const mongoConnect = (callback) => {
  MongoClient.connect(urlDB, optionsDB)
    .then((client) => {
      console.log('Connected to database!');
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log('Connection failed!');
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database foud!';
};

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;

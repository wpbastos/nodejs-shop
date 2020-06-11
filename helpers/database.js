const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const optionsDB = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  retryWrites: true,
  user: process.env.MONGO_ATLAS_USR,
  pass: process.env.MONGO_ATLAS_PSW,
  authSource: 'admin',
};

const urlDB = process.env.MONGO_ATLAS_URL;

console.log('>>> ', optionsDB);
console.log('>>> ', urlDB);

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

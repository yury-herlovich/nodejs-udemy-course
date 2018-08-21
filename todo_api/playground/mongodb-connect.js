require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const envConfig = process.env;

const mongoURL = `mongodb://${envConfig.MONGO_USER}:${envConfig.MONGO_PASS}@${envConfig.MONGO_HOST}:${envConfig.MONGO_PORT}/${envConfig.MONGO_DB}`;

// Use connect method to connect to the server
MongoClient.connect(mongoURL, { useNewUrlParser: true }, function(err, db) {
  if (err) {
    console.log('ERROR: ', err);
  } else {
    console.log("Connected successfully to server");

    db.close();
  }
});
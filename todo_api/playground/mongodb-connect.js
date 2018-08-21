const MongoClient = require('mongodb').MongoClient;

// Connection URL
const mongoURL = 'mongodb://mongo:27017';

// Database Name
const dbName = 'test';

// Use connect method to connect to the server
MongoClient.connect(mongoURL, function(err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});
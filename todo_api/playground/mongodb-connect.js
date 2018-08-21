const MongoClient = require('mongodb').MongoClient;

// Connection URL
const mongoUser = 'qw4u';
const mongoPass = 'EVSm6pNugKpvEosT';
const mongoURL = `mongodb://${mongoUser}:${mongoPass}@ds229552.mlab.com:29552/yury-test`;

// Use connect method to connect to the server
MongoClient.connect(mongoURL, { useNewUrlParser: true }, function(err, db) {
  console.log("Connected successfully to server");

  db.close();
});
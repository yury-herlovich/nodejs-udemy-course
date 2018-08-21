require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const envConfig = process.env;

const mongoURL = `mongodb://${envConfig.MONGO_USER}:${envConfig.MONGO_PASS}@${envConfig.MONGO_HOST}:${envConfig.MONGO_PORT}/${envConfig.MONGO_DB}`;

// Use connect method to connect to the server
MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }

  console.log("Connected to MongoDB server");
  var db=client.db(envConfig.MONGO_DB);

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }

    console.log(JSON.stringify(result.ops, null, 2));
  });

  client.close();
});
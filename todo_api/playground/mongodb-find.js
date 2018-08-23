const { MongoClient, ObjectID } = require('mongodb');

// Connection URL
const envConfig = process.env;

const mongoURL = `mongodb://${envConfig.DB_USER}:${envConfig.DB_PASS}@${envConfig.DB_HOST}:${envConfig.DB_PORT}/${envConfig.DB_DATABASE}`;

// Use connect method to connect to the server
MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }

  console.log("Connected to MongoDB server");
  var db=client.db(envConfig.DB_DATABASE);

  db.collection('Todos')
    // .find({
    //   completed: false
    // })
    .find({
      _id: {'$in' : [new ObjectID('5b7c8b92a311010162170070'), new ObjectID('5b7c8c0daf33e5019e3bf398')]
    }})
    .toArray()
    .then((docs) => {
      console.log('Todos');
      console.log(JSON.stringify(docs, null, 2));
    }, (err) => {
      console.log('Unable to fetch notes.');
    });

  client.close();
});
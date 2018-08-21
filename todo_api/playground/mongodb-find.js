const { MongoClient, ObjectID } = require('mongodb');

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
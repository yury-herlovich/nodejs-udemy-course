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
  var db = client.db(envConfig.MONGO_DB);

  db.collection('Todos')
    .findOneAndUpdate({
      _id: new ObjectID('5b7cccfcd52dcb0139c6a2d2')
    }, {
      $set: {
        completed: false,
      },
      $inc: {
        views: 2
      }
    }, {
      returnOriginal: false
    })
    .then((doc) => {
      console.log(doc);
    });

  client.close();
});
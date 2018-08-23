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
  var db = client.db(envConfig.DB_DATABASE);

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
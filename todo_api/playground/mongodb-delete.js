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

  // db.collection('Todos')
  //   .deleteMany({text: 'Something to do'})
  //   .then((res) => {
  //     console.log(res.deletedCount);
  //   });

  // db.collection('Todos')
  //   .deleteOne({text: 'Something to do'})
  //   .then((res) => {
  //     console.log(res.deletedCount);
  //   });

  db.collection('Todos')
    .findOneAndDelete({text: 'Something to do'})
    .then((res) => {
      console.log(res.value);
    });

  client.close();
});
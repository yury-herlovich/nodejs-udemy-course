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
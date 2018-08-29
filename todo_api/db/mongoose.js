var mongoose = require('mongoose');

// mongoose.set('debug', true);
// mongoose.set('useFindAndModify', false);

// db config
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbDatabase = process.env.DB_DATABASE;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

if (process.env.NODE_ENV === 'test') {
  var dbURL = `mongodb://${dbHost}:${dbPort}/${dbDatabase}`;
} else {
  var dbURL = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbDatabase}`;
}

mongoose.Promise = global.Promise;
mongoose.connect(dbURL, {useNewUrlParser: true});

module.exports = {
  mongoose
};
var mongoose = require('mongoose');

// mongoose.set('debug', true);
// mongoose.set('useFindAndModify', true);

// db config
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbDatabase = process.env.DB_DATABASE;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const dbURL = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbDatabase}`;

mongoose.Promise = global.Promise;
mongoose.connect(dbURL, {useNewUrlParser: true});

module.exports = {
  mongoose
};
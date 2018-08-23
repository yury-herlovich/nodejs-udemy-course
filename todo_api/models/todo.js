var mongoose = require('mongoose');

// db config
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbDatabase = process.env.DB_DATABASE;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const dbURL = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbDatabase}`;

mongoose.Promise = global.Promise;
mongoose.connect(dbURL, {useNewUrlParser: true});

// Todo model
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// new data
var newTodo = new Todo({
  text: 'Learn something.',
  completed: 'false',
  completedAt: Math.floor(+new Date() / 1000)
});

// save data
newTodo.save()
  .then((doc) => {
    console.log('Saved todo', doc);
  }, (err) => {
    console.log('Unable to save todo.');
  });
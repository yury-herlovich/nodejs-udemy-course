// load a proper .env file
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: `${process.cwd()}/.env_test`});
} else {
  require('dotenv').config({path: `${process.cwd()}/.env`});
}

const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

var app = express();

// add body-parser middleware
app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res) => {
  var todo = new Todo({
     text: req.body.text
  });

  todo.save()
    .then((todo) => {
      res.status(201).send({todo});
    }, (err) => {
      res.status(400).send(err);
    });
});

// GET /todos
app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send({todos});
    }, (err) => {
      res.status.send(err);
    });
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    })
    .catch((err) => {
      res.status(404).send();
    });
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    })
    .catch((err) => {
      res.status(400).send();
    });
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }


  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({todo});
    })
    .catch((err) => {
      res.status(400).send();
    });
});


// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  var user = new User(body);

  user.save()
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
})

app.listen(process.env.PORT, () => {
  console.log(`Started up at port ${process.env.PORT}.`);
});

module.exports = {
  app
};
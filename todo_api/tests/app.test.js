const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const { app } = require('./../app');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('Should create a new ToDo', (done) => {
    var text = 'Test todo text';

    chai.request(app)
      .post('/todos')
      .send({text})
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(201);
        res.should.be.json;

        res.body.todo.text.should.equal(text);

        Todo.find({text})
          .then((todos) => {
            todos.should.lengthOf(1);
            todos[0].text.should.be.equal(text);
            done();
          })
          .catch((err) => done(err));
      });
  });


  it('Should not to create a todo with invalide data', (done) => {
    chai.request(app)
      .post('/todos')
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(400);

        Todo.find()
          .then((todos) => {
            todos.should.lengthOf(2);
            // chai.expect(todos).be.null
            done();
          })
          .catch((err) => done(err));
      });
  });
});


describe('GET /todos', () => {
  it('Should return array of todos', (done) => {
    chai.request(app)
      .get('/todos')
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        res.body.should.have.property('todos');
        res.body.todos.should.lengthOf(2);

        done();
      });
  });
});


describe('GET /todos/:id', () => {
  it('Should return todo doc', (done) => {
    var id = todos[0]._id.toHexString();

    chai.request(app)
      .get(`/todos/${id}`)
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        res.body.should.have.property('todo');
        res.body.todo._id.should.equal(id);
        res.body.todo.text.should.equal(todos[0].text);

        done();
      });
  });

  it('Should return 404 if todo not found', (done) => {
    var id = new ObjectID().toHexString();

    chai.request(app)
      .get(`/todos/${id}`)
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(404);
        res.body.should.be.empty;

        done();
      });
  });

  it('Should return 404 for non-object ids', (done) => {
    var id = 123;

    chai.request(app)
      .get(`/todos/${id}`)
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(404);
        res.body.should.be.empty;

        done();
      });
  });
});

describe('DELETE /todos/:id', () => {
  it('Should remove a todo', (done) => {
    var id = todos[0]._id.toHexString();

    chai.request(app)
      .delete(`/todos/${id}`)
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        res.body.should.have.property('todo');
        res.body.todo._id.should.equal(id);
        res.body.todo.text.should.equal(todos[0].text);

        Todo.findById(id)
          .then((doc) => {
            chai.expect(doc).to.be.null;

            done();
          })
          .catch((err) => done(err));
      });
  });

  it('Should return 404 if todo not found', (done) => {
    var id = new ObjectID().toHexString();

    chai.request(app)
      .delete(`/todos/${id}`)
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(404);
        res.body.should.be.empty;

        Todo.find()
          .then((todos) => {
            todos.should.lengthOf(2);

            done();
          })
          .catch((err) => done(err));
      });
  });

  it('Should return 404 if id not valid', (done) => {
    var id = 123;

    chai.request(app)
      .delete(`/todos/${id}`)
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(404);
        res.body.should.be.empty;

        Todo.find()
          .then((todos) => {
            todos.should.lengthOf(2);

            done();
          })
          .catch((err) => done(err));
      });
  });
});

describe('PATCH /todos/:id', () => {
  it('Should update the todo', (done) => {
    var id = todos[0]._id.toHexString();
    var text = 'New text for first todo.';

    chai.request(app)
      .patch(`/todos/${id}`)
      .send({text, completed: true})
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        res.body.should.have.property('todo');
        res.body.todo.text.should.equal(text);
        res.body.todo.completed.should.be.true;
        _.isInteger(res.body.todo.completedAt).should.be.true;

        // check DB
        Todo.findById(id)
          .then((todo) => {
            todo.should.be.not.empty;
            todo.text.should.equal(text);
            todo.completed.should.be.true;
            _.isInteger(todo.completedAt).should.be.true;

            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });

  it('Should clear compleatedAt when todo is not completed', (done) => {
    var id = todos[1]._id.toHexString();
    var text = 'New text for second todo.';

    chai.request(app)
      .patch(`/todos/${id}`)
      .send({text, completed: false})
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.should.have.status(200);
        res.body.should.have.property('todo');
        res.body.todo.text.should.equal(text);
        res.body.todo.completed.should.be.false;
        chai.expect(res.body.todo.completedAt).to.be.null;

        // check DB
        Todo.findById(id)
          .then((todo) => {
            todo.should.be.not.empty;
            todo.text.should.equal(text);
            todo.completed.should.equal(false);
            chai.expect(todo.completedAt).to.be.null;

            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    chai.request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .send()
      .end((err, res) => {
        if (err) {
          done(err);
        }

        res.should.have.status(200);
        res.body._id.should.equal(users[0]._id.toHexString());
        res.body.email.should.equal(users[0].email);

        done();
      });
  });

  it('should return 401 if not authenticated', (done) => {
    chai.request(app)
      .get('/users/me')
      .send()
      .end((err, res) => {
        if (err) {
          done(err);
        }

        res.should.have.status(401);
        chai.expect(res.body).to.be.empty;

        done();
      });
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@test.test';
    var password = '123!123';

    chai.request(app)
      .post('/users')
      .send({email, password})
      .end((err, res) => {
        if (err) {
          done(err);
        }

        res.should.have.status(201);
        res.should.have.header('x-auth');
        res.body.should.have.property('email');
        res.body.should.have.property('_id');

        // check db
        User.findById(res.body._id)
          .then((user) => {
            user.should.not.be.empty;
            bcrypt.compareSync(password, user.password).should.be.true;

            done();
          })
          .catch((err) => {
            done(err);
          });
      });
  });

  it('should return validation errors if request invalid', (done) => {
    var email = 'example';
    var password = '123';

    chai.request(app)
      .post('/users')
      .send({email, password})
      .end((err, res) => {
        if (err) {
          done(err);
        }

        res.should.have.status(400);

        done();
      });
  });

  it('should not create  user if email in use', (done) => {
    var email = users[0].email;
    var password = users[0].password;

    chai.request(app)
      .post('/users')
      .send({email, password})
      .end((err, res) => {
        if (err) {
          done(err);
        }

        res.should.have.status(400);

        done();
      });
  });
});
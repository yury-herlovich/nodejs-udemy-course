const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const { app } = require('./../app');
const { Todo } = require('./../models/todo');

const todos = [
  { text: 'First test todo.' },
  { text: 'Second test todo.' },
];

beforeEach((done) => {
  Todo.remove({})
    .then((() => {
      return Todo.insertMany(todos);
    }))
    .then(() => done());
})

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

        res.body.text.should.equal(text);

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
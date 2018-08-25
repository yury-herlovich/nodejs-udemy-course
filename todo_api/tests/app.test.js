const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

var { app } = require('./../app');
const { Todo } = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({})
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

        Todo.findOneAndRemove({text})
          .then((todos) => {
            todos.text.should.be.equal(text);
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

        Todo.findOneAndRemove()
          .then((todos) => {
            chai.expect(todos).be.null
            done();
          })
          .catch((err) => done(err));
      });
  });
});
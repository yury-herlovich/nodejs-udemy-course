const expect = require("expect");
const utils = require("./utils");

describe('Utils', () => {
  it('should add two numbers', () => {
    var a = 33,
        b = 11;

    var res = utils.add(a, b);

    expect(res).toBe(a + b);
  });


  it('should square a number', () => {
    var x = 8;

    var res = utils.square(x);

    expect(res).toBe(x ** 2);
  })

  it('should async add two numbers', (done) => {
    var a = 5,
        b = 9;

    utils.asyncAdd(a, b, (res) => {
      expect(res).toBe(a + b);
      done();
    })
  })
});


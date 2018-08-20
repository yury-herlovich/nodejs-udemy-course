const utils = require("./utils");

it('should add two numbers', () => {
  var a = 33,
      b = 11;

  var res = utils.add(a, b);

  if (res !== a + b) {
    throw new Error(`Expected ${a + b}, but got ${res}`);
  }
});


it ('should square a number', () => {
  var x = 8;

  var res = utils.square(x);

  if (res !== x * x) {
    throw new Error(`Expected ${x * x}, but got ${res}`);
  }
})
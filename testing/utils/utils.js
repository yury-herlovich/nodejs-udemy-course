module.exports.add = (a, b) => a + b;
module.exports.square = (x) => x * x;
module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 500);
};
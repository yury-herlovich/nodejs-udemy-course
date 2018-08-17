// var somePromise = new Promise((resolve, reject) => {
//   resolve("It works");
// });

// somePromise.then((message) => {
//   console.log("Success: ", message);
// }, (errorMessage) => {
//   console.log("Error: ", errorMessage);
// });


var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === "number" && typeof b === "number") {
        resolve(a + b);
      } else {
        reject("Arguments must be numbers");
      }
    }, 1000);
  });
};

asyncAdd(5, 7)
  .then((res) => {
    console.log("Result: ", res);
    return asyncAdd(res, 30);
  })
  .then((res) => {
    console.log("Result: ", res);
  })
  .catch((errorMessage) => {
    console.log("Error: ", errorMessage);
  });
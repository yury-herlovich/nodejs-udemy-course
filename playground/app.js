var somePromise = new Promise((resolve, reject) => {
  resolve("It works");
});

somePromise.then((message) => {
  console.log("Success: ", message);
}, (errorMessage) => {
  console.log("Error: ", errorMessage);
});
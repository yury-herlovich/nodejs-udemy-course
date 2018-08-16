const request = require("request");
const fs = require("fs");

// const data = require("./data.json");

const geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json";
const address = "7400 Hollywood Blvd";

// console.log(data);

// request({
//   url: geoCodeURL + "?address=" + encodeURIComponent(address),
//   json: true
// }, (err, response, body) => {
//   console.log(JSON.stringify(body, null, 1));
// });
const request = require("request");

const geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json";
const data = require("./data.json");

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    request({
      url: geoCodeURL + "?address=" + encodeURIComponent(address),
      json: true
    }, (err, resp, body) => {
      if (err ) {
        reject("Unable to connect to server.");
      }

      if (body.status === "ZERO_RESULTS") {
        reject("Unable to find address.");
      }

      if (body.status !== "OK") {
        body = data;
      }

      resolve({
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    });
  });
};


module.exports = {
  geocodeAddress
};
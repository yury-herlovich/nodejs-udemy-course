const request = require("request");

const geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json";
// const data = require("./data.json");

var geocodeAddress = (address, callback) => {
  request({
    url: geoCodeURL + "?address=" + encodeURIComponent(address),
    json: true
  }, (_err, _resp, _body) => {
    var error, response;

    if (_err) {
      error = "Unable to connect to Google servers.";
    } else if (_body.status !== "OK") {
      error = "Unable to find that address.";
    } else {
      response = {
        address: _body.results[0].formatted_address,
        latitude: _body.results[0].geometry.location.lat,
        longitude: _body.results[0].geometry.location.lng
      };
    }

    if (callback) {
      callback(error, response);
    }
  });
};

module.exports = {
  geocodeAddress
};
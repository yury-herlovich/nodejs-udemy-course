const request = require("request");

const geocode = require("./geocode");

const address = "7400 Hollywood Blvd";

geocode.geocodeAddress(address, (_err, _resp) => {
  if (_err) {
    console.log(_err);
  } else {
    console.log(_resp);
  }
});
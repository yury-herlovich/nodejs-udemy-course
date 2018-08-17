const request = require("request");

const geocode = require("./geocode");
const forecast = require("./forecast");

const address = "7400 Hollywood Blvd";

geocode.geocodeAddress(address, (_err, _resp) => {
  if (_err) {
    console.log(_err);
  } else {
    console.log(_resp.address);

    forecast.getForecast(_resp.latitude, _resp.longitude, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  }
});
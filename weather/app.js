const request = require("request");

const geocode = require("./geocode");
const forecast = require("./forecast");

const address = "7400 Hollywood Blvd";

geocode.geocodeAddress(address)
  .then((response) => {
    console.log("Address: ", response.address);
    return forecast.getForecast(response.latitude, response.longitude)
  })
  .then((result) => {
    console.log("Temperature: ", result);
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  });
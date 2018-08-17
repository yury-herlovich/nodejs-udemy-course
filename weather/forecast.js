const request = require("request");

const apiKey = "c4339fa24e758643556e37ee4f954aaa";
const url = "https://api.darksky.net/forecast";

var getForecast = (lat, lng, callback) => {
  request({
    url: `${url}/${apiKey}/${lat},${lng}`,
    json: true
  }, (err, resp, body) => {
    var error, result;

    if (!err && resp.statusCode === 200) {
      result = body.currently.temperature;
    } else {
      error = "Unable to fetch weather.";
    }

    if (callback) {
      callback(error, result);
    }
  });
}

module.exports = {
  getForecast
}
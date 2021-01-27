const request = require("request");

const forecast = (longitude, latitude, callback) => {
  //This is the 'address' from #3
  const url =
    "http://api.weatherstack.com/current?access_key=b03f3b0e9be087fd36e367e32309049d&query=" +
    longitude +
    "," +
    latitude +
    "&units=f";

  //This is the 'callback' from #3
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined); // Low level error
    } else if (response.body.error) {
      callback("Unable to find location", undefined); //High level error
    } else {
      callback(
        undefined,
        "It is currently " +
          response.body.current.temperature +
          " degrees out and " +
          response.body.current.weather_descriptions +
          ". There is a " +
          response.body.current.precip +
          "% chance of rain."
      );
    }
  });
  // This is the request to access the api and to access the json file
};
module.exports = forecast;

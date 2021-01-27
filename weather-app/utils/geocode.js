const request = require('request')

const geocode = (address, callback) => {
  //encodeURIComponent allows for the use of special characters(?,~, etc) in the address to avoid errors
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicGVyZXowOTc4IiwiYSI6ImNraGwzNGsxcjEwZDIycnA1bTRwejhlaXYifQ.jgQsNzWSOScRCrp3FVtvbQ&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) { //.features returns an array, in this case there is no location so the array length is 0.
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(undefined, { // latitude:, longitude:, and location: are properties of the response we returning
      latitude: response.body.features[0].center[1],
      longitude: response.body.features[0].center[0],
      location: response.body.features[0].place_name
      })
    }
  });
};

module.exports = geocode
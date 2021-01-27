const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (!address) {
  console.log("Please enter a location name");
} else {
  geocode(address, (error, geocodeData) => {
    if (error) {
      return console.log(error); // Using return here will stop the rest of the script from running
    }
    // Below is where we're going to have access to the results after the geocoding process is complete

    forecast(
      geocodeData.latitude,
      geocodeData.longitude,
      (error, forecastData) => {
        if (error) {
          return console.log(error); // Using return here will stop the rest of the script from running
        }
        console.log(geocodeData.location);
        console.log(forecastData);
      }
    );
  });
}

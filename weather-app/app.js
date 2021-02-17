const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];
//--------------------------------------
if (!address) {
  console.log("Please enter a location name");
} else {
  geocode(address, (error, {latitude, longitude, location} = {}) => { //refer to 5-es6-objects.js for explanation
    if (error) {
      return console.log(error); // Using return here will stop the rest of the script from running
    }
    // Below is where we're going to have access to the results after the geocoding process is complete
//----------------------------------------

    forecast( latitude, longitude, (error, forecastData) => {
        if (error) {
          return console.log(error); // Using return here will stop the rest of the script from running
        }
        console.log(latitude, longitude)
        console.log(location);
        console.log(forecastData);
      }
    );
  });
}

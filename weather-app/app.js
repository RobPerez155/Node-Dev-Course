const request = require("request")

// const url = "http://api.weatherstack.com/current?access_key=b03f3b0e9be087fd36e367e32309049d&query=41.5965,72.8776&units=f"

request({ url: url, json: true }, (error, response) => { //url: and json: are shortcuts provided in the notes for this api
  
  if (error) { // This is for when things mess up at a lower level, like no connectivity
    console.log('Unable to connect to weather service')
  } else if (response.body.error) { // This is for higher level errors, like when there's a wrong user input
  console.log("unable to find location")
} else {
    const current = response.body.current
    const temp = current.temperature
    const chanceOfRain = current.precip
    const weather = current.weather_descriptions
    console.log(`It is currently ${temp} degrees out and ${weather}. There is a ${chanceOfRain}% chance of rain.`)
  }
})

// Geocoding - takes an address like Philadelphia PA and returns a latitude and longitude
//Address -> converts to Lat/Long -> Sent to weather api

const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Southington.json?access_token=pk.eyJ1IjoicGVyZXowOTc4IiwiYSI6ImNraGwzNGsxcjEwZDIycnA1bTRwejhlaXYifQ.jgQsNzWSOScRCrp3FVtvbQ&limit=1"

request({url: geocodeURL, json: true}, (error, response) => {
  if (error) {
    console.log('Unable to connect to weather service')
  } else if (response.body.features.length === 0){ //.features returns an array, in this case there is no location so the array length is 0.
    console.log('Unable to find location')
  } else {
  const latitude = response.body.features[0].center[1]
  const longitude = response.body.features[0].center[0]
  console.log(`${latitude}, ${longitude}`)
  }
})
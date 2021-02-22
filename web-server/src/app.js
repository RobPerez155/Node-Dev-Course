const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { report } = require("process");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); // Setting up handlebars(dyanmic templating npm)
app.set("views", viewsPath); // Here we are telling express to use this folder
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//new hbs index route
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rob Perez",
  });
  //Our second argument in render will give a value to what we call on in our index.hbs file, in this case the title and name
  //On #12 we do not need the file extensions, we only need the file name -- res.render converts our hbs file into to html
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Rob Perez",
    helpText:
      "If you came here looking for help, you're in real trouble because there ain't none to be found here.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rob Perez",
  });
});

// app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  // geocode function runs geocode.js from Utils folder
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error}); // Here we used the shorthand for error: error
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }
      res.send({ forecast: forecastData, location, address: req.query.address });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help page not found",
    name: "Rob Perez",
    errorMessage: "Oh SNAP! Help article not found!",
  });
});

app.get("*", (req, res) => {
  // Express gives us this wildcard symbol '*' means 'match anything that hasn't been matched so far'
  res.render("404", {
    title: "404 Error",
    name: "Rob Perez",
    errorMessage: "Page not found, dork",
  });
});

app.listen(3000, () => {
  console.log("This code was ran asynchronously when the server was started");
}); //This is what we need to start up the server, 3000 is the port number we'll use

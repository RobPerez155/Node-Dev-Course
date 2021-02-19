const path = require('path')
const express = require('express')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') //here we are creating a directory path
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // Setting up handlebars(dyanmic templating npm)
app.set('views', viewsPath)// Here we are telling express to use this folder

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//new hbs index route
app.get('', (req, res) => {
  res.render('index', { 
    title: 'Weather',
    name: 'Rob Perez'
  }) 
  //Our second argument in render will give a value to what we call on in our index.hbs file, in this case the title and name
  //On #12 we do not need the file extensions, we only need the file name -- res.render converts our hbs file into to html
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    helpText: 'If you came here looking for help, you\'re in real trouble because there ain\'t none to be found here.'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Rob Perez'
  })
})

// app.com/weather
app.get('/weather', (req, res) => {
  res.send({
    forecast: 'It\'s gonna rain!',
    location: 'Tempe, AZ'
  })
})

app.listen(3000, () => {
  console.log('This code was ran asynchronously when the server was started')
})  //This is what we need to start up the server, 3000 is the port number we'll use
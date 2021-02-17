const http = require('http')

const url =
"http://api.weatherstack.com/current?access_key=b03f3b0e9be087fd36e367e32309049d&query=40,-75&units=f"

const request = https.request(url, (response) => {
  let data = ''


  response.on('data', (chunk) => {
    data = data + chunk.toString()
  })

  response.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })
})

request.on('error', (error) => {
  console.log('An error',error)
})

request.end()
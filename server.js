const http = require('http')
const port = Number(process.argv[2])
const type = process.argv[3]
const city = process.argv[4]
const server = http.createServer()
const key = 'c4a5fb1794bd408687f122847190503'
const baseUrl = 'http://api.apixu.com/v1/'
const {
  howIsTheWeather,
  getUrl
} = require('./weather_client.js')

function panic (res, code) {
  var payload = JSON.stringify({ error: code })
  res.writeHead(code, {'content-type': 'application/json'})
  res.end(payload)
  console.error(payload)
}

function handler (req, res) {
  if (!res) return panic(res, 400)
  res.writeHead(200, { 'content-type': 'application/json'})
  let url = getUrl(baseUrl, type, city, key)
  howIsTheWeather(url, (err, data) => {
    if (err) console.error(err)
    const payload = data
  })
  res.end(payload)
  console.log(payload)
}

server.on('request', handler)
server.on('listening', function () {
  console.log('Listening... ')
})

if (!port || (port < 0 || port >= 65536)) {
  return console.error('port is missing')
}

server.listen(port, '0.0.0.0')

const http = require('http')
const port = Number(process.argv[2])
const server = http.createServer()
const type = 'current.json'
const city = 'Lagos'
const key = 'c4a5fb1794bd408687f122847190503'
// const key = '*******************************'
const baseUrl = 'http://api.apixu.com/v1/'
const {
  howIsTheWeather,
  getUrl
} = require('./weather_client.js')

const url = getUrl(baseUrl, type, city, key)

function panic (res, code) {
  var payload = JSON.stringify({ error: code })
  res.writeHead(code, {'content-type': 'application/json'})
  res.end(payload)
  console.error(payload)
}

function handler (req, res) {
  if (!res) return panic(res, 400)
  res.writeHead(200, { 'content-type': 'application/json'})
  howIsTheWeather(url, (err, payload) => {
    if (err) console.error(err)
    var payloadstr = JSON.stringify(payload)
    res.end(payloadstr)
  })
}

server.on('request', handler)
server.on('listening', function () {
  console.log('Listening... ')
})

if (!port || (port < 0 || port >= 65536)) {
  return console.error('port is missing')
}

server.listen(port, '0.0.0.0')

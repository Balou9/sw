const http = require('http')
const port = Number(process.argv[2])
const type = process.argv[2]
const city = process.argv[3]
const server = http.createServer()

function panic (res, code) {
  var payload = JSON.stringify({ error: code })
  res.writeHead(code, {'content-type': 'application/json'})
  res.end(payload)
  console.error(payload)
}

function handler (req, res) {
  if (!res) return panic(res, 400)
  res.writeHead(200, { 'content-type': 'application/json'})
  var payload(JSON.stringify({fraud: 'Weather is true'}))
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

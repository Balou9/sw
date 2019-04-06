var http = require('http')
var port = Number(process.argv[2])
const type = process.argv[3]
const city = process.argv[4]

http.get({
  hostname: '0.0.0.0',
  port: port,
}, function (res) {
  res.pipe(process.stdout)
})

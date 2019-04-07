const http = require('http')
const port = Number(process.argv[2])

http.get({
  hostname: '0.0.0.0',
  port: port
}, (res) => {
  res.pipe(process.stdout)
})

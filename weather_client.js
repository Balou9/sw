var http = require('http')
var baseUrl = 'http://api.apixu.com/v1/'
var type = process.argv[3]
var city = process.argv[4]
var date = process.argv[5]
var key = '*******************************'

var types = {
   current: 'current.json',
   forecast: 'forecast.json',
   search: 'search.json',
   history: 'history.json'
}

function getUrl (base, ty, cit, yourKey, dt) {
  if (!dt) {
    if (ty == 'current') return base + types.current + '?key=' + yourKey + '&q=' + cit
    if (ty == 'forecast') return base + types.forecast + '?key=' + yourKey + '&q=' + cit
    if (ty == 'search') return base + types.search + '?key=' + yourKey + '&q=' + cit
  }
  else return base + types.history + '?key=' + yourKey + '&q=' + cit + '&dt=' + dt
}

function panic (res, code) {
  var payload = JSON.stringify({ error: code })
  res.writeHead(code, { 'content-type': 'application/json' })
  res.end(payload)
  console.error(payload)
}

var url = getUrl(baseUrl, type, city, key, date)

http.get(url, (res) => {
  if (!res) return panic(res, 400)
  if (res.statusCode !== 200 || res.statusCode !== 400 ) console.log(res.statusMessage)
  let raw = ''
  res.on('data', (chunk) => { raw += chunk })
  res.on('end', () => {
    try {
      var parsed = JSON.parse(raw)
      console.log(parsed)
    } catch (e) {
      console.error(e.message)
    }
  })
}).on('error', (e) => {
  console.error(e.message)
})

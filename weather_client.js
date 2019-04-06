const http = require('http')

// hashing key?
// const types = {
//   current: 'current.json',
//   forecast: 'forecast.json',
//   search: 'search.json',
//   history: 'history.json'
// }

function getUrl (base, ty, cit, yourKey) {
  return base + ty + '?key=' + yourKey + '&q=' + cit
}

function howIsTheWeather (url, cb) {
  http.get(url, (res) => {
    if (res.statusCode !== 200) cb("Request failed why")
    let raw = ''
    res.on('data', (chunk) => { raw += chunk })
    res.on('end', () => {
      try {
        const parsed = JSON.parse(raw)
        cb(parsed)
      } catch (e) {
        console.error(e.message)
      }
    })
  }).on('error', (e) => {
    console.error(e.message)
  })
}

module.exports = {
  howIsTheWeather,
  getUrl
}

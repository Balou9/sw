const http = require('http')
const key = 'c4a5fb1794bd408687f122847190503'
const type = process.argv[2]
const city = process.argv[3]
const baseUrl = 'http://api.apixu.com/v1/'

const types = {
  current: 'current.json',
  forecast: 'forecast.json',
  search: 'search.json',
  history: 'history.json'
}

function getUrl (base, ty, cit) {
  return base + type + '?key=' + key + '&q=' + city
}

let url = getUrl(baseUrl, type, city)
// hashing key?
// city via process.argv

http.get(url, (res) => {
  if (res.statusCode !== 200) return new Error("Request failed why")
  let raw = ''
  res.on('data', (chunk) => { raw += chunk })
  res.on('end', () => {
    try {
      const parsed = JSON.parse(raw)
      console.log(raw)
    } catch (e) {
      console.error(e.message)
    }
  })
}).on('error', (e) => {
  console.error(e.message)
})

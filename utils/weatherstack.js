const request = require('postman-request')

const weatherstack = (coordinates, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=5bbbde132e06c65af591c81b4e6a57fa&query='+coordinates[0]+','+coordinates[1]

request({ url: url, json: true }, (error, response) => {
    if(error) {
        callback('Unable to connect to weather service!')
    } else if (response.body.error) {
        callback('Something went wrong!')
    } else {
    currentWeather = response.body.current
    callback(undefined, ('it is currently: ' + currentWeather.temperature + ' degrees out. it feels like ' + currentWeather.feelslike + ' degrees out, and it is ' + currentWeather.weather_descriptions[0]))

    }
})
}

module.exports = weatherstack
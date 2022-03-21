const request = require('postman-request')

// const url = 'http://api.weatherstack.com/current?access_key=5bbbde132e06c65af591c81b4e6a57fa&query=37.8267,-122.4223'

// request({ url: url, json: true }, (error, response) => {
//     if(error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Something went wrong!')
//     } else {
//     currentWeather = response.body.current

//     console.log('it is currently:',currentWeather.temperature, 'degrees out. it feels like', currentWeather.feelslike, 'degrees out, and it is', currentWeather.weather_descriptions[0])
//     }
// })

const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoieWVoeWFoYW16YXd5IiwiYSI6ImNsMHpwb25xNTI0dzEzbG41MDlub29zZnYifQ.hRZlSU7Ejm93iY2atp_FKA&limit=1'

request({url: geoURL, json: true}, (error, response) => {
    if(error) {
        console.log('Unable to connect to weather service!')
    } else if(response.body.features === undefined) {
        console.log('Something went wrong!')

    }else if (response.body.features.length === 0) {
        console.log('Bad location!')
    } else {
    const longitude = response.body.features[0].center[0]
    const latitude = response.body.features[0].center[1]
    console.log(latitude, longitude)
    }
    
})
const request = require('postman-request')

const geocode = (address, callback) => {

    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieWVoeWFoYW16YXd5IiwiYSI6ImNsMHpwb25xNTI0dzEzbG41MDlub29zZnYifQ.hRZlSU7Ejm93iY2atp_FKA&limit=1'

request({url: geoURL, json: true}, (error, response) => {
    if(error) {
        callback('Unable to connect to geocode service!')
    } else if(response.body.features === undefined) {
        callback('Something went wrong!')

    }else if (response.body.features.length === 0) {
        callback('Bad location!')
    } else {
    const longitude = response.body.features[0].center[0]
    const latitude = response.body.features[0].center[1]
    callback(undefined, [latitude, longitude])
    }
    
})

}

module.exports = geocode
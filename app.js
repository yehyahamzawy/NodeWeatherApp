const geocode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')

if(process.argv[2]===undefined) console.log('No address provided')

else geocode(process.argv[2], (geoError, geoData) => { //i could use the shorthand syntax and parse the arguement: {latitude, longitude, placeName} = {}, 
                                                       //but i would just empty everything from the parsed object. which is just counterintuitive
    if(geoError) console.log('error:', geoError)

   else  weatherstack([geoData.latitude, geoData.longitude], (weatherstackError, weatherstackData) => {
       if(weatherstackError) console.log('error:', weatherstackError)

       else console.log('data:', weatherstackData, 'place:', geoData.placeName)
     })
   

})


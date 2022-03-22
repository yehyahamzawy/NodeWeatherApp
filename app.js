const geocode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')


geocode('Madinaty', (error, data) => {
    if(error) console.log('error:', error)

   else  weatherstack([data[0],data[1]], (error, data) => {
       if(error) console.log('error:', error)

       else console.log('data:', data)
     })
   

})


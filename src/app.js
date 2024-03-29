const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')

const app = express()
const port = process.env.PORT || 3000

require('dotenv').config();
const weatherstackKey = process.env.WEATHERSTACK_KEY
const geocodeKey = process.env.MAPBOX_KEY

// defining config paths
const publicDir = path.join(__dirname,'../public')
const tempsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup for handlebars engine and path
app.set('view engine', 'hbs') // hbs is a handle bar npm package to create a dynamic handle bar. takes advantage of express. express takes it as engine. must write 'view engine'
app.set('views', tempsPath) // this changes the default directory (views) name and path to a desired one
hbs.registerPartials(partialsPath)

// static serve up directories
app.use(express.static(publicDir))

app.get('', (req, res) => { //renders the handle bar that we set (hbs)
    res.render('index', {
        title: 'No Man\'s Weather',
        name: 'Yehya Hamzawy',
    }) 
})



app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Yehya Hamzawy'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'you must provide an address'
        })
    }
    
    geocode(req.query.address, geocodeKey, (geoError, geoData) => { //i could use the shorthand syntax and parse the arguement: {latitude, longitude, placeName} = {}, 
                                                       //but i would just empty everything from the parsed object. which is just counterintuitive
    if(geoError) return res.send({
        error: geoError
    })

     weatherstack([geoData.latitude,geoData.longitude], weatherstackKey,(weatherstackError, weatherstackData) => {
       if(weatherstackError) return res.send({
        error: weatherstackError
    })

    
     res.send({
         name:'Yehya Hamzawy', 
        forecast: weatherstackData,
        location: geoData.placeName,
        address: req.query.address
    })
     })
   

})


})


app.get('*', (req, res) =>{
    res.render('404', {
        title: 'page not found 404',
        name: 'yaya'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port,)
})
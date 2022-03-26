const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')

const app = express()

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
        name: 'yaya'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
     title: 'need help?',
     name: 'yaya'
 })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'yaya'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.render('weather',{
            error: 'you must provide an address'
        })
    }
    
    geocode(req.query.address, (geoError, geoData) => { //i could use the shorthand syntax and parse the arguement: {latitude, longitude, placeName} = {}, 
                                                       //but i would just empty everything from the parsed object. which is just counterintuitive
    if(geoError) return res.render('weather',{
        error: geoError
    })

     weatherstack([geoData.latitude, geoData.longitude], (weatherstackError, weatherstackData) => {
       if(weatherstackError) return res.render('weather',{
        error: weatherstackError
    })

    
     res.render('weather',{
         name:'yaya', 
        forecast: weatherstackData,
        location: geoData.placeName,
        address: req.query.address
    })
     })
   

})


})



app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'help article not found 404',
        name: 'yaya'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'page not found 404',
        name: 'yaya'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})
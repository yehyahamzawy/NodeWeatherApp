const express = require('express')
const path = require('path')

console.log(__dirname)
const publicDir = path.join(__dirname,'../public')

const app = express()

app.set('view engine', 'hbs') // hbs is a handle bar npm package to create a dynamic handle bar. takes advantage of express. express takes it as engine. must write 'view engine'
app.use(express.static(publicDir))



app.get('', (req, res) => {
    res.render('index', {
        title: 'No Man\'s Weather',
        name: 'yaya'
    }) //renders the handle bar that we set (hbs)
})

app.get('/help', (req, res) => {
    res.render('about', {
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
    res.send('weather is nice')
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})
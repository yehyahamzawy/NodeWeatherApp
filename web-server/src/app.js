const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send('hello express hh')
})

app.get('/help', (req, res) => {
    res.send('need help? h')
})

app.get('/about', (req, res) => {
    res.send('we show weather hh')
})

app.get('/weather', (req, res) => {
    res.send('weather is nice')
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecastMsg = document.querySelector('#forecast')
const locationMsg = document.querySelector('#location')

//forecastMsg.textContent = 'hello'
//locationMsg.textContent = 'hi'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error)
            {
                forecastMsg.textContent = '...'
                locationMsg.textContent = data.error
            } else {
                forecastMsg.textContent = data.forecast
                locationMsg.textContent = data.location
            }
        })
    })
})
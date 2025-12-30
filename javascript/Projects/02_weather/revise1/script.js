// targeting elements
const cityInput = document.getElementById('city-input')
const getWeatherBtn = document.getElementById('get-weather-btn')
const weatherInfo = document.getElementById('weather-info')
const cityName = document.getElementById('city-name')
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')
const errorMessage = document.getElementById('error-message')

// api key
const API_KEY = '99fa5aa46ac20da7836f00d5e2f60ed8'

// getWeatherFunc
async function getWeatherFunc() {
    const city = cityInput.value.trim()
    cityInput.value = ""
    try {
        const data = await fetchData(city)
        displayData(data)
    } catch (error) {
        console.log(error)
        showErrorMessage()
    }
}

// handling getWeatherBtn click
getWeatherBtn.addEventListener('click', getWeatherFunc)

// handling Enter on city input
cityInput.addEventListener('keydown',(e)=>{ 
    if(e.key === 'Enter') getWeatherFunc()
})

// fetchData function
async function fetchData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
`
    const response = await fetch(url)
    const data = await response.json()
    return data
}
// displays data function
function displayData(data){
    console.log(data)
    cityName.textContent = data.name
    temperature.textContent = `Temprature : ${data.main.temp}`
    description.textContent = `Description : ${data.weather[0].description}`
    // displays data
    showData()
}

// shows data & hides error message
function showData() {
    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')
}

// shows error message and hides data
function showErrorMessage() {
    errorMessage.classList.remove('hidden')
    weatherInfo.classList.add('hidden')
}
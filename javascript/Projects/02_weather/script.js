document.addEventListener('DOMContentLoaded',()=>{
  const cityInput = document.getElementById('city-input')
  const getWeatherBtn = document.getElementById('get-weather-btn')
  const weatherInfo = document.getElementById('weather-info')
  const cityNameDisplay = document.getElementById('city-name')
  const tempratureDisplay = document.getElementById('temperature')
  const descriptionDisplay = document.getElementById('description')
  const errorMessage = document.getElementById('error-message')

  const API_KEY = '99fa5aa46ac20da7836f00d5e2f60ed8'

  getWeatherBtn.addEventListener('click', async ()=>{
    const city = cityInput.value.trim()
    if(!city) return;

    // Note: while fetching data from external sources:
    // 1. It may throw error
    // 2. It may take time

    try {
      const weatherData = await fetchWeatherData(city)
      displayWeatherData(weatherData)
    } catch (error) {
      showError()
    }

  })

  // Fetches Weather Data
  async function fetchWeatherData(city){
    // gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    if(!response.ok){
       throw new Error("Error Fetching Data")
    }
    const data = await response.json()
    return data
  }

  // Displays Weather Data
  function displayWeatherData(data){
    // Display
    const {name, main, weather} = data
    cityNameDisplay.textContent = name
    tempratureDisplay.textContent = `Temprature : ${main.temp}`
    descriptionDisplay.textContent = `Description : ${weather[0].description}`
    console.log(name)
    console.log(main.temp)
    console.log(weather[0].description)
    showData()
  }

  

  // Shows Error
  function showError(){
    weatherInfo.classList.add('hidden')
    errorMessage.classList.remove('hidden')
  }

  // Removes Error
  function showData(){
  weatherInfo.classList.remove('hidden')
  errorMessage.classList.add('hidden')
  }
})

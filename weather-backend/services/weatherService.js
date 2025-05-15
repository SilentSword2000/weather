const axios = require('axios');
const API_KEY = process.env.WEATHER_API_KEY;

async function fetchWeatherFromAPI(location) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
    );

    const data = response.data;
    return {
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch weather data');
  }
}

module.exports = { fetchWeatherFromAPI };

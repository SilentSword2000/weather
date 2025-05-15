const axios = require('axios');
const Weather = require('../models/Weather');
require('dotenv').config();

const API_KEY = process.env.WEATHER_API_KEY;

module.exports = {
  getWeather: async ({ location }) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
    );
    const { temp } = res.data.main;
    const description = res.data.weather[0].description;
    const icon = res.data.weather[0].icon;
    const date = new Date().toISOString().split('T')[0];

    return {
      location,
      temperature: temp,
      description,
      icon,
      date
    };
  },

  getHistory: async ({ location, fromDate, toDate }) => {
    return await Weather.find({
      location,
      date: { $gte: fromDate, $lte: toDate }
    }).sort({ date: 1 });
  },

  fetchWeather: async ({ input }) => {
    const { location, fromDate, toDate } = input;

    // current date only (simplified)
    const today = new Date().toISOString().split('T')[0];

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
    );

    const { temp } = res.data.main;
    const description = res.data.weather[0].description;
    const icon = res.data.weather[0].icon;

    const weather = new Weather({
      location,
      temperature: temp,
      description,
      icon,
      date: today
    });

    await weather.save();
    return [weather];
  }
};

const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  location: String,
  temperature: Number,
  description: String,
  icon: String,
  date: String
});

module.exports = mongoose.model('Weather', WeatherSchema);

 
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  feelsLike: Number,
  description: String,
  icon: String,
  sunset: String,
  hourly: [
    {
      time: String,
      temp: Number,
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Weather', weatherSchema);

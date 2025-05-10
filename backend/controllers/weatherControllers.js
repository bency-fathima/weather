const axios = require('axios');  // If you're using Axios to fetch weather data
require('dotenv').config();

const getWeatherForecast = async (req, res) => {
  try {
    const location = req.body.location;

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

     const apiKey = process.env.WEATHER_API_KEY;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

     const weatherResponse = await axios.get(weatherApiUrl);
     const forecastResponse = await axios.get(forecastApiUrl);

     const hourlyData = forecastResponse.data.list.slice(0, 5).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString(),  // Convert Unix timestamp to time string
      temp: item.main.temp,
    }));

     res.json({
      city: weatherResponse.data.name,
      temp: weatherResponse.data.main.temp,
      description: weatherResponse.data.weather[0].description,
      sunrise: weatherResponse.data.sys.sunrise,
      sunset: weatherResponse.data.sys.sunset,
      icon: weatherResponse.data.weather[0].icon,
      hourly: hourlyData,  
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { getWeatherForecast };

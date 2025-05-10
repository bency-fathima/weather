 const express = require('express');
const router = express.Router();
const { getWeatherForecast } = require('../controllers/weatherControllers');

 router.post('/', getWeatherForecast);

module.exports = router;

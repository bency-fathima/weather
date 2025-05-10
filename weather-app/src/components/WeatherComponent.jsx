import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../features/weather/weatherSlice";
import bg from "../assets/bg1.jpg";

const WeatherComponent = () => {
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const { weatherData, loading, error } = useSelector((state) => state.weather);

  const handleSearch = () => {
    if (location) dispatch(fetchWeather(location));
  };

  const getWeatherIconUrl = (icon) =>
    `https://openweathermap.org/img/wn/${icon}@4x.png`;

  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit" });

  const todayDate = new Date().toLocaleDateString();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8">
         <div className="bg-opacity-10 bg-red-200 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
          <div className="flex flex-col sm:flex-row mb-6 gap-4">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-grow px-4 py-2 rounded-lg text-black"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-red-800 rounded-lg"
            >
              Search
            </button>
          </div>

          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-400">Error: {error}</p>}

          {weatherData?.city && (
            <div className="text-center space-y-2 mb-4 text-red-800">
               <div className="flex flex-row items-center sm:flex-row sm:justify-center gap-4">
                {weatherData.icon && (
                  <img
                    className="w-20 h-20"
                    src={getWeatherIconUrl(weatherData.icon)}
                    alt="Weather icon"
                  />
                )}
                <h3 className="text-4xl font-semibold">{weatherData.temp}°</h3>
              </div>
              <p className="text-xl">{weatherData.description}</p>
              <p className="text-sm">{weatherData.city}</p>
              <p className="text-sm">{todayDate}</p>
              <div className="flex flex-row sm:flex-row justify-center text-sm gap-2">
                <p>Sunrise at {formatTime(weatherData.sunrise)}</p>
                <span className="">|</span>
                <p>Sunset at {formatTime(weatherData.sunset)}</p>
              </div>
            </div>
          )}
        </div>

         <div className=" w-[300px] md:w-[600px]">
          {weatherData?.hourly && (
           <div>
             <div className="overflow-x-auto whitespace-nowrap bg-red-200 bg-opacity-10 p-4 sm:p-6 rounded-lg">
              <ul className="flex gap-4">
                {weatherData.hourly.map((item, index) => (
                  <li key={index} className="flex-shrink-0 text-center text-black">
                    <div className=" bg-opacity-20 p-2 rounded-lg w-[30%]">
                      <p className="text-xs sm:text-sm">{item.time}</p>
                      <p className="text-xs sm:text-sm">{item.temp}°C</p>
                     </div>
                  </li>

                  
                ))}
              </ul>
            </div>
            <div className="text-white mt-8">
              <h1 className="font-bold">Random Text</h1>
              <p className="font-semibold text-justify ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos maiores accusantium rem. Maxime modi officiis mollitia vel illum praesentium rerum earum facere, eum possimus doloribus perferendis aliquid, accusantium temporibus aliquam.
              Magni inventore sapiente eius. Delectus expedita reprehenderit iure sequi officia dolores dicta nemo laborum! Aliquam repellat sed perferendis sunt quos voluptatibus fugiat reiciendis iste.</p>
           </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;

"use client"

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f3d89d1838516057f10e7230115945d4`
      );

      setWeatherData(response.data);

      // Store weather description in local storage
      localStorage.setItem('weatherDescription', response.data.weather[0].description);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 rounded-lg shadow-lg dark-mode:bg-gray-800 light-mode:bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark-mode:bg-gray-700 dark-mode:text-white light-mode:bg-white light-mode:text-black"
      />
      <button
        onClick={getWeatherData}
        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
      >
        Get Weather
      </button>

      {weatherData && (
        <div className="mt-8">
          <h2 className="text-2xl mb-2">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="text-lg">Temperature: {weatherData.main.temp} °C</p>
          <p className="text-lg">Weather: {weatherData.weather[0].description}</p>
          <div class="flex space-x-4">
  <Link href="/pages/cocktail" class="bg-blue-500 text-white py-2 px-4 rounded-md inline-block">Perfect drink for this weather</Link>
  <Link href="/pages/movie" class="bg-blue-500 text-white py-2 px-4 rounded-md inline-block">Perfect movie for this weather</Link>
</div>

        </div>
      )}
    </div>
  );
};

export default Weather;

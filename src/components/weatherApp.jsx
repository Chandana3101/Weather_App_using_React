
import React, { useEffect, useState } from 'react';
import './weatherApp.css';
import search_icon from '../assets/search.png';
import sun_icon from '../assets/sun.png';
import cloudy_icon from '../assets/cloudy.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/Rain.png'; 
import snow_icon from '../assets/snow.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/windy.png';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null); 
  const [city, setCity] = useState('London'); 

  const allIcons = {
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon, // Corrected the key
    "10n": rain_icon, // Corrected the key
    "13d": snow_icon, // Corrected the key
    "13n": snow_icon, // Corrected the key
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json(); // Await the json response

      if (response.ok) {
        const icon = allIcons[data.weather[0].icon] || sun_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      } else {
        setWeatherData(null);
        console.error('Error fetching data:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search(city);
  }, [city]); // Depend on the city state

  const handleSearchClick = () => {
    const input = document.querySelector('.searchbar input');
    setCity(input.value);
  };

  return (
    <div className="weather">
      <div className="searchbar">
        <input type="text" placeholder="Search" />
        <img id="search" src={search_icon} onClick={handleSearchClick} alt="Search" />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} className="weather-icon" alt="Weather Icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather_data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherApp;

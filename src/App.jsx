// WeatherApp.js
import { useState, useEffect } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { configDotenv } from "dotenv";

const enteryourkey = import.meta.env.VITE_API_KEY;
const enteryourapi = import.meta.env.VITE_API_API;


function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(""); //Initially its set to null because the weather data hasn't been fetched yet.
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    if (search) {
      fetchWeather();
    }
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `${enteryourapi}?q=${search}&units=metric&appid=${enteryourkey}`
      );
      if (!response.ok) {
        throw new Error("Error");
      }
      const result = await response.json();
      // console.log(result)
      // setLoading(true)
      setWeather(result);
      setError("");
    } catch (error) {
      if (error.message === "Error") {
        setError("Plese Enter Correct City Name");
        setWeather("");
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // console.log('Updating current time...');
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="bg-gradient-to-r from-red-600 to-purple-800 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-purple-900 rounded-lg shadow-lg">
        <div className="weather-card p-4 border-2 border-black-900 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Today's Weather
              </h2>
              <p className="text-gray-400">
                {currentDateTime.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter location"
                className="border border-gray-700 px-3 py-1 rounded-md focus:outline-none"
              />
              <button
                className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={fetchWeather}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {weather && (
            <div className="mt-6">
              <div className="flex justify-center items-center">
                <i className="fas fa-sun text-yellow-400 text-5xl animate-bounce"></i>
                <div className="ml-4">
                  <p className="text-3xl font-bold text-white">
                    {weather.main.temp}°C
                  </p>
                  <p className="text-gray-400">
                    {weather.weather[0].description}
                  </p>
                  <div className="flex items-center mt-2">
                    <FontAwesomeIcon
                      icon={faSun}
                      className="text-yellow-400 mr-2"
                    />
                    <p className="text-gray-400">
                      Sunrise:{" "}
                      {new Date(
                        weather.sys.sunrise * 1000
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <FontAwesomeIcon
                      icon={faMoon}
                      className="text-gray-400 mr-2"
                    />
                    <p className="text-gray-400">
                      Sunset:{" "}
                      {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <div>
                  <p className="text-gray-400">Humidity</p>
                  <p className="font-semibold text-white">
                    {weather.main.humidity}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Wind</p>
                  <p className="font-semibold text-white">
                    {weather.wind.speed} km/h
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Pressure</p>
                  <p className="font-semibold text-white">
                    {weather.main.pressure}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

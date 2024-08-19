import { useState } from "preact/hooks";
import "./app.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";

export function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const search = (event) => {
    if (event.key === "Enter") {
      if (!input || input.trim().length < 2) {
        setWeather({ ...weather, error: true });
        return;
      }

      setInput("");
      setWeather({ ...weather, loading: true, error: false });

      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: input,
            units: "metric",
            appid: "f00c38e0279b7bc85480c3fe775d518c",
          },
        })
        .then((res) => {
          setWeather({ loading: false, data: res.data, error: false });
        })
        .catch((err) => {
          setWeather({ loading: false, data: {}, error: true });
        });
    }
  };

  return (
    <div className="App">
      <div className="weather-app">
        <h1 className="title">Weather Now</h1> 
        <div className="city-search">
          <input
            className="city"
            type="text"
            placeholder="Enter City Name ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
          />
        </div>
        
        {weather.loading && (
          <div className="loader">
            <Oval type="Oval" color="#4A90E2" height={70} width={70} />
          </div>
        )}

        {weather.error && (
          <div className="error-message">
            <span>City Not Found. Please enter a valid city name.</span>
          </div>
        )}

        {weather.data.main && (
          <div className="weather-info">
            <h2 className="city-name">{weather.data.name}</h2>
            <p className="temp">{Math.round(weather.data.main.temp)}°C</p>
            <p className="description">{weather.data.weather[0].description}</p>
            <div className="additional-info">
              <p>Humidity: {weather.data.main.humidity}%</p>
              <p>Wind Speed: {weather.data.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

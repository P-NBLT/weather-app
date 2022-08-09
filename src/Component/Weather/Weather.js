import React from "react";
import "./Weather.css";

const date = new Date();
const Card = ({ weatherData }) => {
  let cities = weatherData.name;
  //   console.log(cities);
  return (
    <div className="card">
      <h1>{cities}</h1>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
      />
      <p>{weatherData.current.weather[0].main}</p>
      <p>{Math.round(weatherData.current.temp)}&deg;C</p>
      <div className="maxmin">
        <p>H: {Math.round(weatherData.daily[0].temp.max)}&deg;C</p>
        <p>L: {Math.round(weatherData.daily[0].temp.min)}&deg;C</p>
      </div>
      <p>Feels like: {Math.round(weatherData.current.feels_like)}&deg;C</p>
      <p>Humidity: {weatherData.current.humidity}%</p>
    </div>
  );
};

export default Card;

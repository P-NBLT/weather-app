import React from "react";
import "./Weather7Days.css";
import calendar from "../Media/calendar.png";

const Weather7Days = ({ weatherData }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <div className="container">
      <div className="title2">
        <img src={calendar} className="calendar" />
        <p>7-Day Forecast</p>
      </div>
      {weatherData.daily.map((el, idx) => (
        <div className="weather7Days" key={idx}>
          <p className="day">{days[new Date(el.dt * 1000).getDay()]}</p>
          <img
            src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
          />
          <p>L {Math.round(el.temp.min)}&deg;C</p>
          <p>H {Math.round(el.temp.max)}&deg;C</p>
        </div>
      ))}
    </div>
  );
};

export default Weather7Days;

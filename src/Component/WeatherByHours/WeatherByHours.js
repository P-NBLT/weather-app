import React from "react";
import "./WeatherByHours.css";

const WeatherByHours = ({ weatherData }) => {
  return (
    <div>
      <div className="allHoursContainer" id="allHoursContainer">
        <p className="title">Hourly Forecast</p>
        <div className="allHours">
          {weatherData.hourly.map((el, idx) => {
            if (idx <= 25)
              return (
                <div className="hours" key={idx}>
                  <p>{new Date(el.dt * 1000).getHours()}h</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                  />
                  <p>{Math.round(el.temp)}&deg;C</p>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherByHours;

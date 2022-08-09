import "./App.css";
import React, { useState, useEffect } from "react";
import Weather from "./Component/Weather/Weather";
import Weather7Days from "./Component/Weather7Days/Weather7Days";
import WeatherByHours from "./Component/WeatherByHours/WeatherByHours";
import Button from "./Component/ButtonCity/Button";

const endPoint = "https://api.openweathermap.org/data/2.5/";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [data7Days, setData7Days] = useState([]);
  const [getApiKey, setGetApiKey] = useState();
  const [loading, setLoading] = useState(false);
  let [city, setCity] = useState("");

  const handleInputClick = (e) => {
    setCity(e);
  };

  const fetchData = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };

  useEffect(() => {
    async function fetchApi() {
      const url = `/.netlify/functions/getApiKey`;
      try {
        setLoading(true);
        const apiKey = await fetch(url).then((res) => {
          if (res.status !== 200) {
            throw new Error(
              `There was an error with status code ${res.status}`
            );
          }

          return res.json();
        });

        setGetApiKey(apiKey.apiKey);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchApi();
  }, []);

  useEffect(() => {
    if (
      (lat.length !== 0 && long.length !== 0 && getApiKey) ||
      (getApiKey && city)
    ) {
      if (city === "") {
        fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${getApiKey}`
        )
          .then((res) => res.json())
          .then((result) => {
            setCity(result[0].name);
          })
          .then(
            fetch(
              `${endPoint}onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely,alerts&appid=${getApiKey}`
            ).then((res) => setData(res.json()))
          );
      } else if (city !== "") {
        fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${getApiKey}`
        )
          .then((res) => res.json())
          .then((result) => {
            fetch(
              `${endPoint}onecall?lat=${result[0].lat}&lon=${result[0].lon}&units=metric&exclude=minutely,alerts&appid=${getApiKey}`
            )
              .then((res) => res.json())
              .then((result) => {
                setData(result);
              });
          });

        city = city.split("");
        city[0] = city[0].toUpperCase();
        setCity(city.join(""));
      }
    } else if (getApiKey) {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=paris&appid=${getApiKey}`
      )
        .then((res) => res.json())
        .then((result) => {
          fetch(
            `${endPoint}onecall?lat=${result[0].lat}&lon=${result[0].lon}&units=metric&exclude=minutely,alerts&appid=${getApiKey}`
          )
            .then((res) => res.json())
            .then((result) => {
              setData(result);
            });
        });

      setCity("paris");
    }

    fetchData();
  }, [lat, long, city, getApiKey]);

  return (
    <div className="App">
      <div className="topMeteo">
        <div className="searchHeader">
          <Button handleClick={handleInputClick} city={city} />
          {/* <p className="city">{city}</p> */}
        </div>
        <div className="current">
          {typeof data.current !== "undefined" ? (
            <Weather weatherData={data} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="weahterByHours">
        {typeof data.current !== "undefined" ? (
          <WeatherByHours weatherData={data} />
        ) : (
          <div>
            <p>Searching Data</p>
          </div>
        )}
      </div>
      <div>
        {typeof data.daily !== "undefined" ? (
          <Weather7Days weatherData={data} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;

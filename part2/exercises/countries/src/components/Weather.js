import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const openweathermap_key = process.env.REACT_APP_OPENWEATHERMAP_KEY;
    const latlng = country.capitalInfo.latlng;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latlng[0]}&lon=${latlng[1]}&appid=${openweathermap_key}`).then(response => {
      setWeather(response.data);
    });
  }, [country.capitalInfo.latlng]);

  if(weather === null) {
    return (
      <></>
    )
  }
  
  const weatherImg = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      <div>temperature {weather.main.temp} Celcius</div>
      <div><img src={weatherImg} alt="weather" /></div>
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather;
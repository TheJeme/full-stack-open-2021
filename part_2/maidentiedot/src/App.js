import React, { useState } from "react";
import axios from "axios";

function Country(props) {
  return (
    <div>
      <h1>{props.countries[0].name}</h1>
      <p>capital {props.countries[0].capital}</p>
      <p>population {props.countries[0].population}</p>
      <h2>languages</h2>
      <ul>
        {props.countries[0].languages.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
      <img src={props.countries[0].flag} width="150" alt="flag" />
      <h2>Weather in {props.countries[0].capital}</h2>
      <h3>
        <b>temperature: </b>
        {props.weather.current.temperature} Celcius
      </h3>
      <img src={props.weather.current.weather_icons} width="150" alt="flag" />
      <h3>
        <b>wind: </b>
        {props.weather.current.wind_speed} mph direction{" "}
        {props.weather.current.wind_dir}
      </h3>
    </div>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState();

  function updateInput(e) {
    if (e.length === 0) return;

    axios
      .get(`https://restcountries.eu/rest/v2/name/${e}`)
      .then((response) => {
        if (response.status === 404) return;
        setCountries(response.data);
        axios
          .get(
            `http://api.weatherstack.com/current?access_key=4bd2edeeede5bb574b943f6a688773a0&query=${response.data[0].capital}`
          )
          .then((response) => {
            setWeather(response.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  let data;
  if (countries.length > 10) {
    data = <p>Too many</p>;
  } else if (countries.length > 1) {
    data = (
      <div>
        {countries.map((p) => (
          <p key={p.name}>
            {p.name} <button onClick={() => updateInput(p.name)}>show</button>
          </p>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    data = <Country countries={countries} weather={weather} />;
  } else {
    <p>Not found</p>;
  }

  return (
    <div>
      <p>
        find countries <input onChange={(e) => updateInput(e.target.value)} />
      </p>
      {data}
    </div>
  );
}

export default App;

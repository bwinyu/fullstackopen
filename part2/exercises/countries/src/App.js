import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      const countriesFiltered = response.data.filter(country => country.name.common.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
      setCountries(countriesFiltered);
    });
  }, [searchTerm]);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  }
  const searchTermInput = (
    <div>
      find countries <input onChange={handleSearchTerm} value={searchTerm} />
    </div>
  )

  const handleCountryClick = (countryName) => {
    return () => {
      const countriesFiltered = countries.filter(country => country.name.common === countryName);
      setCountries(countriesFiltered);
    }
  }

  if(countries.length > 10) {
    return (
      <div>
        {searchTermInput}
        Too many matches, specify another filter
      </div>
    )
  } else if(countries.length === 1) {
    const country = countries[0];
    const languages = Object.values(country.languages).map(language => <li key={language}>{language}</li>);
  
    return (
      <div>
        {searchTermInput}
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <br />
        <div><b>languages:</b></div>
        <ul>
          {languages}
        </ul>
        <img src={country.flags.png} alt="flag" />
        <Weather country={country} />
      </div>
    )
  }

  const countriesContent = countries.map(country => (
    <div key={country.name.common}>
      {country.name.common} <button onClick={handleCountryClick(country.name.common)}>show</button>
    </div>
  ))
  return (
    <div>
      {searchTermInput}
      {countriesContent}
    </div>
  )
}

export default App;

import { useState, useEffect } from "react";
import SvgMap from "./SvgMap";
import "./index.css";

function App() {

  const [countryElement, setCountryElement] = useState(null);

  const [countryDetails, setCountryDetails] = useState(null);

  function clickHandler(event){

    if(countryElement != null){
      countryElement.style.fill = '#c0c0c0';
    }
    setCountryElement(event.target);
    event.target.style.fill = 'lightblue';

  }

useEffect(() => {

  if(countryElement != null){

    if(countryElement.id === "il"){

      countryElement.id = "ps";

    }

    if(countryElement.id === "se" || countryElement.id === "no" || countryElement.id === "de" || countryElement.id === "gb" || countryElement.id === "ru"){

      countryElement.id = "dk";

    }

  fetch('https://restcountries.com/v3.1/alpha/' + countryElement.id)
    .then(response => response.json())
    .then((data) => {
      const countryObj = {
        name: data[0].name.common,
        capital: data[0].capital,
        area: data[0].area,
        population: data[0].population,
        flag: data[0].flags.png,
        coatOfArms: data[0].coatOfArms.png
      }
      setCountryDetails(countryObj)
      }
    )
    .catch(error => console.error('Error fetching country:"', error));
  }
}, [countryElement]);

return (
  <div>
    <title>Country Info JavaScript</title>
    <h1>Country Info</h1>

    <div className="map-wrapper" onClick={clickHandler}>
      <SvgMap />
      {countryDetails && (
        <div className="info-card">
          <div className="info-row">
            <p><strong>ID:</strong> {countryElement.id}</p>
            <p><strong>Name:</strong> {countryDetails.name}</p>
            <p><strong>Capital:</strong> {countryDetails.capital}</p>
            <p><strong>Population:</strong> {countryDetails.population.toLocaleString()}</p>
            <p><strong>Area:</strong> {countryDetails.area.toLocaleString()} km²</p>
          </div>

          <div className="flags-row">
            <div className="flag-box">
              <img src={countryDetails.flag} width="90" />
            </div>

            <div className="flag-box">
              <img src={countryDetails.coatOfArms} width="90" />
            </div>
          </div>

          <div className="denmark-compare">
            This country has a population {(countryDetails.population/6000000).toFixed(2)}× { (countryDetails.population/6000000).toFixed(2) > 1 ? "bigger" : "smaller"} than the best country on earth: Denmark.
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default App

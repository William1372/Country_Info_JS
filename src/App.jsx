import { useState, useEffect } from "react";
import SvgMap from "./SvgMap";
import "./index.css";

function App() {

  const [countryElement, setCountryElement] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);
  const [rounds, setRounds] = useState(0);
  const [startCountry, setStartCountry] = useState(null);
  const [correctElement, setCorrectElement] = useState(null);
  const [wrongElement, setWrongElement] = useState(null);
  const [countriesQuiz, setCountriesQuiz] = useState(["Greenland", "Iceland", "Ireland", "United Kingdom", "Spain", "Portugal", "Morocco", "Algeria", "Tunisia", "Italy", "France", "Belgium", "Netherlands", "Denmark", "Sweden", "Norway", "Finland", "Russia", "Estonia", "Lithuania", "Latvia", "Belarus", "Poland", "Germany", "Ukraine", "Romania", "Bulgaria", "Moldova", "Czechia", "Austria", "Hungary", "Greece", "North Macedonia", "Serbia", "Kosovo", "Croatia", "Slovenia", "Slovakia", "Montenegro", "Bosnia and Herzegovina", "Albania", "Kazakhstan", "Georgia", "Armenia", "Azerbaijan", "Iran", "Turkey", "Lebanon", "Syria", "Iraq", "Armenia", "Palestine", "Jordan", "Saudi Arabia", "Lebanon", "Cyprus", "Luxembourg", "Liechtenstein", ]);
  const [showInfo, setShowInfo] = useState(false);

  function clickHandler(event){

    if (event.target === correctElement || event.target === wrongElement) return;
    if (!event.target.id) return;

    setCountryElement(event.target);

  }

  useEffect(() => {

    if (countriesQuiz.length > 0) {
      const random = Math.floor(Math.random() * countriesQuiz.length);
      setStartCountry(countriesQuiz[random]);
    }
  }, [countriesQuiz]);

useEffect(() => {

  
  if(countryElement){


  fetch('https://restcountries.com/v3.1/alpha/' + countryElement.id)
    .then(response => response.json())
    .then((data) => {
      const c = {
        name: data[0].name.common,
        capital: data[0].capital,
        area: data[0].area,
        population: data[0].population,
        flag: data[0].flags.png,
        coatOfArms: data[0].coatOfArms.png
      };
      setCountryDetails(c)
      setShowInfo(true);

    setTimeout(() => {
      setShowInfo(false);
    }, 1500);
      if (!c.name) return;
    if (c.name === startCountry) {
      countryElement.style.fill = "green";
      setCorrectElement(countryElement);
      setRounds(prev => prev +1);
    }else{
      countryElement.style.fill = "red";
      setWrongElement(countryElement);
    }
      setCountriesQuiz(prev => prev.filter(x => x !== startCountry));
      }
    )
    .catch(error => console.error('Error fetching country:"', error));
  }
}, [countryElement]);

return (
  <div>
    <title>Country Quiz JavaScript</title>
    <h1>Country Quiz & Info</h1>

    <div className="map-wrapper" onClick={clickHandler}>
      <SvgMap />
      <div className="quiz">
        <p>Points: {rounds}/{countriesQuiz.length}</p>
        <p>Country: {startCountry}</p>
      </div>
      {countryDetails && (
        <div className={`info-card ${showInfo ? "" : "hidden"}`}>
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
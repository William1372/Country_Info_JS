import { useState, useEffect } from "react";
import SvgMap from "./SvgMap";
import "./index.css";
import useTimer from "./useTimer";

function App() {
  const [countryElement, setCountryElement] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);
  const [rounds, setRounds] = useState(0);
  const [startCountry, setStartCountry] = useState(null);
  const [countriesQuiz, setCountriesQuiz] = useState([
    "Greenland",
    "Iceland",
    "Ireland",
    "United Kingdom",
    "Spain",
    "Portugal",
    "Morocco",
    "Algeria",
    "Tunisia",
    "Italy",
    "France",
    "Belgium",
    "Netherlands",
    "Denmark",
    "Sweden",
    "Norway",
    "Finland",
    "Russia",
    "Estonia",
    "Lithuania",
    "Latvia",
    "Belarus",
    "Poland",
    "Germany",
    "Ukraine",
    "Romania",
    "Bulgaria",
    "Moldova",
    "Czechia",
    "Austria",
    "Hungary",
    "Greece",
    "North Macedonia",
    "Serbia",
    "Kosovo",
    "Croatia",
    "Slovenia",
    "Slovakia",
    "Montenegro",
    "Bosnia and Herzegovina",
    "Albania",
    "Kazakhstan",
    "Georgia",
    "Armenia",
    "Azerbaijan",
    "Iran",
    "Turkey",
    "Lebanon",
    "Syria",
    "Iraq",
    "Armenia",
    "Palestine",
    "Jordan",
    "Saudi Arabia",
    "Lebanon",
    "Cyprus",
    "Luxembourg",
    "Liechtenstein",
  ]);
  const [showInfo, setShowInfo] = useState(false);
  const [timeLeft, setTimeLeft] = useTimer(10);
  const originalCountries = [
    "Greenland",
    "Iceland",
    "Ireland",
    "United Kingdom",
    "Spain",
    "Portugal",
    "Morocco",
    "Algeria",
    "Tunisia",
    "Italy",
    "France",
    "Belgium",
    "Netherlands",
    "Denmark",
    "Sweden",
    "Norway",
    "Finland",
    "Russia",
    "Estonia",
    "Lithuania",
    "Latvia",
    "Belarus",
    "Poland",
    "Germany",
    "Ukraine",
    "Romania",
    "Bulgaria",
    "Moldova",
    "Czechia",
    "Austria",
    "Hungary",
    "Greece",
    "North Macedonia",
    "Serbia",
    "Kosovo",
    "Croatia",
    "Slovenia",
    "Slovakia",
    "Montenegro",
    "Bosnia and Herzegovina",
    "Albania",
    "Kazakhstan",
    "Georgia",
    "Armenia",
    "Azerbaijan",
    "Iran",
    "Turkey",
    "Lebanon",
    "Syria",
    "Iraq",
    "Armenia",
    "Palestine",
    "Jordan",
    "Saudi Arabia",
    "Lebanon",
    "Cyprus",
    "Luxembourg",
    "Liechtenstein",
  ];

  function clickHandler(event) {
    if (event.target.style.fill === "green") return;

    if (!event.target.id) return;

    if (timeLeft <= 0) return;

    setCountryElement(event.target);
  }

  useEffect(() => {
    if (countriesQuiz.length > 0) {
      const random = Math.floor(Math.random() * countriesQuiz.length);

      setStartCountry(countriesQuiz[random]);
    }
  }, [countriesQuiz]);

  function resetGame() {
    const allCountries = document.querySelectorAll("svg path, svg polygon");
    allCountries.forEach((el) => {
      el.style.fill = "";
    });

    setRounds(0);
    setCountriesQuiz(originalCountries);
    setStartCountry(null);
    setCountryDetails(null);
    setCountryElement(null);
    setShowInfo(false);
    setTimeLeft(10);

    const random = Math.floor(Math.random() * originalCountries.length);
    setStartCountry(originalCountries[random]);
  }

  useEffect(() => {
    document.body.style.backgroundColor = getBackgroundColor();
    document.body.style.transition = "background-color 0.5s linear";
  }, [timeLeft]);

  useEffect(() => {
    if (countryElement) {
      fetch("https://restcountries.com/v3.1/alpha/" + countryElement.id)
        .then((response) => response.json())
        .then((data) => {
          const c = {
            name: data[0].name.common,
            capital: data[0].capital,
            area: data[0].area,
            population: data[0].population,
            flag: data[0].flags.png,
            coatOfArms: data[0].coatOfArms.png,
          };
          setCountryDetails(c);
          setShowInfo(true);

          setTimeout(() => {
            setShowInfo(false);
          }, 1000);
          if (c.name === startCountry) {
            countryElement.style.fill = "green";
            setRounds((prev) => prev + 1);
            setCountriesQuiz((prev) => prev.filter((x) => x !== startCountry));
            setTimeLeft((prev) => prev + 5);
          }
          if (c.name !== startCountry) {
            const originalFill = countryElement.style.fill;

            setTimeout(() => {
              countryElement.style.fill = originalFill;
            }, 500);

            countryElement.style.fill = "red";
            const random = Math.floor(Math.random() * countriesQuiz.length);
            setStartCountry(countriesQuiz[random]);
          }
        })
        .catch((error) => console.error('Error fetching country:"', error));
    }
  }, [countryElement]);

  function getBackgroundColor() {
    if (timeLeft > 10) {
      return "white";
    }

    const redIntensity = Math.floor((10 - timeLeft) * (255 / 10));
    return `rgb(255, ${200 - redIntensity}, ${200 - redIntensity})`;
  }

  return (
    <div>
      <title>Country Quiz JavaScript</title>
      <h1>Country Quiz & Info</h1>

      <div className="map-wrapper" onClick={clickHandler}>
        <SvgMap />

        <div className="quiz">
          <p>
            Points: {rounds}/{countriesQuiz.length}
          </p>
          <p>Country: {startCountry}</p>
          <p>
            Timer:{" "}
            {timeLeft > 0 && countriesQuiz.length > 0
              ? `${timeLeft} second${timeLeft === 1 ? "" : "s"}`
              : "YOU LOST!"}
          </p>
          <div className="refresh-button">
            <button onClick={resetGame}>RESTART GAME</button>
          </div>
        </div>

        {countryDetails && (
          <div className={`info-card ${showInfo ? "" : "hidden"}`}>
            <div className="info-row">
              <p>
                <strong>ID:</strong> {countryElement.id}
              </p>
              <p>
                <strong>Name:</strong> {countryDetails.name}
              </p>
              <p>
                <strong>Capital:</strong> {countryDetails.capital}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {countryDetails.population.toLocaleString()}
              </p>
              <p>
                <strong>Area:</strong> {countryDetails.area.toLocaleString()}{" "}
                km²
              </p>
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
              This country has a population{" "}
              {(countryDetails.population / 6000000).toFixed(2)}×{" "}
              {(countryDetails.population / 6000000).toFixed(2) > 1
                ? "bigger"
                : "smaller"}{" "}
              than the best country on earth: Denmark.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

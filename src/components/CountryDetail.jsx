import React, { useContext, useEffect, useState } from "react";
import "./countryDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const CountryDetail = () => {
  const [isDark] = useContext(ThemeContext);
  const params = useParams();
  const { state } = useLocation();

  const countryName = params.country;

  const [countryData, setCountryData] = useState({});
  const [notFound, setNotFound] = useState(false);

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0].common,
      population: data.population.toLocaleString("en-IN"),
      flag: data.flags.svg,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital.join(","),
      tld: data.tld,
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(","),
      languages: Object.values(data.languages || {}).join(", "),
      borders: [],
    });
    if (!data.borders) {
      data.borders = [];
    }
    Promise.all(
      data.borders?.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setTimeout(() =>
        setCountryData((prevState) => ({ ...prevState, borders }))
      );
    });
  }

  useEffect(() => {
    // if (state) {
    //   updateCountryData(state);
    //   return;
    // }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })
      .catch((err) => {
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return (
      <div>
        <h1>Country not Found</h1>
      </div>
    );
  }

  return countryData === null ? (
    "Loading..."
  ) : (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>

        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName || countryData.name}</b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>Population: {countryData.population}</b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData?.capital}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData.languages}</b>
                <span className="languages"></span>
              </p>
            </div>
            {countryData.borders?.length !== 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders?.map((border) => (
                  <Link key={border} to={`/${border}`}>
                    {border}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetail;
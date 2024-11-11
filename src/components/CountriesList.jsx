import React, { useState, useEffect } from "react";
import CountriesData from "../../../CountriesData";
import CountryCard from "./CountryCard";
import CountryListShimmer from "./CountryListShimmer";

const CountriesList = ({ query }) => {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      });
  }, []);

  return (
    <>
      {!countriesData.length ? (
        <CountryListShimmer />
      ) : (
        <div className="countries-container">
          {CountriesData.filter(
            (country) =>
              country.name.common.toLowerCase().includes(query) ||
              country.region.toLowerCase().includes(query)
          ).map((country) => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population.toLocaleString("en-IN")}
                region={country.region}
                capital={country.capital?.[0]}
                data={country}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CountriesList;

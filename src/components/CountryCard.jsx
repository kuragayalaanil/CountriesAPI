import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const CountryCard = ({ name, flag, population, region, capital, data }) => {
  // const [isDark] = useOutletContext();

  return (
    <Link to={`/${name}`} className="country-card" state={{ data }}>
      <div className="flag-container">
        {" "}
        <img src={flag} alt={name + `flag`} />
      </div>
      <div className="card-text">
        <h3 className="card-title">{name}</h3>
        <p>
          <b>Population: </b>
          {population}
        </p>
        <p>
          <b>Region: </b>
          {region}
        </p>
        <p>
          <b>Capital: </b>
          {capital}
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;

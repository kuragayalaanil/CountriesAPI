import React from "react";
import "./CountryListShimmer.css";

const CountryListShimmer = () => {
  const mapped = Array.from({ length: 10 }).map((el, idx) => {
    return <div key={idx} className="country-card shimmerCard"></div>;
  });

  return <div className="countries-container">{mapped}</div>;
};

export default CountryListShimmer;

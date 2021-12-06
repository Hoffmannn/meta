import "./style.scss";

import React from "react";

const CountryCard = ({ country }: any) => {
  return (
    <section className="countryCard">
      <h2>
        {country.flag.emoji} {country.name}
      </h2>
      <h3>Capital: {country.capital} </h3>
    </section>
  );
};

export default CountryCard;

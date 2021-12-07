import "./style.scss";

import { Link } from "react-router-dom";
import React from "react";

const CountryCard = ({ country }: any) => {
  return (
    <Link to={`/pais?name=${country.name}`}>
      <section className="countryCard">
        <h2>
          {country.flag.emoji} {country.nameTranslations[0].value}
        </h2>
        <h3>Capital: {country.capital || "Sem capital"} </h3>
      </section>
    </Link>
  );
};

export default CountryCard;

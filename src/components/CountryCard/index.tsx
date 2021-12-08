import "./style.scss";

import { Link } from "react-router-dom";
import React from "react";

const CountryCard = ({ country }: any) => {
  return (
    <Link to={`/pais?name=${country.name.common}`}>
      <section className="countryCard">
        <h2>
          {country.flag} {country.translations.por.common}
        </h2>
        <h3>
          Capital: {country.capital ? country.capital[0] : "Sem capital"}{" "}
        </h3>
      </section>
    </Link>
  );
};

export default CountryCard;

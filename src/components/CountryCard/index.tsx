import "./style.scss";

import { Link } from "react-router-dom";
import { countryData } from "../../contexts/CountryContext";

const CountryCard = (props: any) => {
  const country: countryData = props.country;
  return (
    <Link to={`/pais?name=${country.name.common}`}>
      <section className="countryCard">
        <h2>
          <img src={country.flags.png} /> {country.translations.por.common}
        </h2>
        <h3>
          Capital: {country.capital ? country.capital[0] : "Sem capital"}{" "}
        </h3>
      </section>
    </Link>
  );
};

export default CountryCard;

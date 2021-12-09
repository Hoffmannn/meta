import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { countryData } from "../../contexts/CountryContext";

const CountryCard = (props: any) => {
  const country: countryData = props.country;
  return (
    <Link to={`/pais?name=${country.name.common}`}>
      <Card className="countryCard">
        <Card.Img variant="top" src={country.flags.png} />
        <Card.Body>
          <Card.Title>{country.translations.por.common}</Card.Title>
          <Card.Text>
            Capital: {country.capital ? country.capital[0] : "Sem capital"}{" "}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CountryCard;

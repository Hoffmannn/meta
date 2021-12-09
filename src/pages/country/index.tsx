import "./style.scss";

import { Button, Card, Spinner } from "react-bootstrap";
import { CountryContext, countryData } from "../../contexts/CountryContext";
import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

const Country: React.FC = () => {
  const { countries, updateCountries } = useContext(CountryContext);
  const [isDataEditable, setIsDataEditable] = useState(false);
  const [country, setCountry] = useState({} as countryData);
  const [countryTranslatedName, setCountryTranslatedName] = useState("");
  const [capital, setCapital] = useState("");
  const [area, setArea] = useState(0);
  const [population, setPopulation] = useState(0);
  const [tld, setTld] = useState("");

  const query = useQuery();
  //Buscar query da URL e preencher os dados do país
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    const countryName = query.get("name");
    countries &&
      setCountry(
        countries.find((country) => country.name.common == countryName) ||
          country
      );
  }, [countries]);

  useEffect(() => {
    if (country) {
      country.translations &&
        setCountryTranslatedName(country.translations.por.common);
      country.capital && setCapital(country.capital[0]);
      country.population && setPopulation(country.population);
      country.area && setArea(country.area);
      country.tld && setTld(country.tld[0]);
    }
  }, [country]);
  //

  const handleSaveNewData = () => {
    const countryIndex = countries.findIndex((c) => c.name == country.name);
    const newCountries = countries;
    newCountries[countryIndex] = {
      ...countries[countryIndex],
      area: area,
      capital: [capital],
      population: population,
      tld: [tld],
      translations: { por: { common: countryTranslatedName } },
    };

    updateCountries(newCountries);

    setIsDataEditable(false);
  };

  return (
    <>
      <Link to="/">
        <Button variant="light" className="button">
          Voltar
        </Button>
      </Link>
      {!isDataEditable ? (
        <Button
          variant="light"
          className="button"
          onClick={() => setIsDataEditable(true)}
        >
          Editar dados
        </Button>
      ) : (
        <Button
          variant="light"
          className="button"
          onClick={() => handleSaveNewData()}
        >
          Salvar dados
        </Button>
      )}

      {Object.keys(country).length > 0 ? (
        <>
          {!isDataEditable ? (
            <Card className="countryContainer">
              <Card.Img src={country.flags.png} className="countryFlag" />
              <Card.Title className="countryName">
                País: {countryTranslatedName}
              </Card.Title>
              <Card.Body>
                <p>Capital: {country.capital ? capital : "Sem capital"}</p>
                <p>Área (km²): {area}</p>
                <p>População: {population}</p>
                <p>Top Level Domain: {tld}</p>
              </Card.Body>
            </Card>
          ) : (
            <Card className="countryContainer">
              <Card.Img src={country.flags.png} className="countryFlag" />
              <Card.Title className="countryName">
                País:{" "}
                <input
                  type="text"
                  value={countryTranslatedName}
                  onChange={(e) => setCountryTranslatedName(e.target.value)}
                />
              </Card.Title>
              <Card.Body>
                <p>
                  Capital:{" "}
                  <input
                    type="text"
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                  />
                </p>
                <p>
                  Área (km²):{" "}
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(parseInt(e.target.value))}
                  />
                </p>
                <p>
                  População:{" "}
                  <input
                    type="number"
                    value={population}
                    onChange={(e) => setPopulation(parseInt(e.target.value))}
                  />
                </p>
                <p>
                  Top Level Domain:{" "}
                  <input
                    type="text"
                    value={tld}
                    onChange={(e) => setTld(e.target.value)}
                  />
                </p>
              </Card.Body>
            </Card>
          )}
        </>
      ) : (
        <Spinner animation="border" role="status" className="spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </>
  );
};

export default Country;

import { CountryContext, countryData } from "../../../contexts/CountryContext";
import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

const Country: React.FC = () => {
  const { countries, setCountries } = useContext(CountryContext);
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

    setCountries(newCountries);

    setIsDataEditable(false);
  };

  return (
    <>
      <Link to="/">
        <button>Voltar</button>
      </Link>
      {!isDataEditable ? (
        <button onClick={() => setIsDataEditable(true)}>Editar dados</button>
      ) : (
        <button onClick={() => handleSaveNewData()}>Salvar dados</button>
      )}

      {Object.keys(country).length > 0 ? (
        <>
          {!isDataEditable ? (
            <div>
              <h2>
                País: {countryTranslatedName} {country.flag}
              </h2>
              <h2>Capital: {country.capital ? capital : "Sem capital"}</h2>
              <h2>Área (km²): {area}</h2>
              <h2>População: {population}</h2>
              <h2>Top Level Domain: {tld}</h2>
            </div>
          ) : (
            <div>
              <h2>
                País:{" "}
                <input
                  type="text"
                  value={countryTranslatedName}
                  onChange={(e) => setCountryTranslatedName(e.target.value)}
                />
              </h2>
              <h2>
                Capital:{" "}
                <input
                  type="text"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                />
              </h2>
              <h2>
                Área (km²):{" "}
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value))}
                />
              </h2>
              <h2>
                População:{" "}
                <input
                  type="number"
                  value={population}
                  onChange={(e) => setPopulation(parseInt(e.target.value))}
                />
              </h2>
              <h2>
                Top Level Domain:{" "}
                <input
                  type="text"
                  value={tld}
                  onChange={(e) => setTld(e.target.value)}
                />
              </h2>
            </div>
          )}
        </>
      ) : (
        <h2>Carregando...</h2>
      )}
    </>
  );
};

export default Country;

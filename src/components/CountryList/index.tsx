import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import CountryCard from "../CountryCard";
import { CountryContext } from "../../contexts/CountryContext";
import { Spinner } from "react-bootstrap";

const CountryList: React.FC = () => {
  const [countryName, setCountryName] = useState("");
  const [queryOffset, setQueryOffset] = useState(0);

  const { countries, isLoading, fetchCountries } = useContext(CountryContext);
  const [shownCountries, setShownCountries] = useState(countries || []);

  useEffect(() => {
    setShownCountries(countries);
  }, [countries]);

  //Funcionalidade de Scroll infinito

  function loadMore() {
    setQueryOffset(queryOffset + 10);
  }
  const handleScroll = (e: any) => {
    if (e) {
      const hasReachedBottom =
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (hasReachedBottom) {
        loadMore();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
  }, []);
  //

  const handleSearchCountry = (searchValue: string) => {
    setCountryName(searchValue);
    if (countries) {
      setShownCountries(
        countries.filter((country: any) =>
          country.translations.por.common
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(
              searchValue
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            )
        )
      );
    }
  };

  return (
    <div className="countryListContainer">
      <h2>Lista de países</h2>
      <input
        value={countryName}
        placeholder="Pesquisar um país"
        onChange={(e) => handleSearchCountry(e.target.value)}
      />
      <div className="countryList" onScroll={(e) => handleScroll(e)}>
        {isLoading ? (
          <Spinner animation="border" role="status" className="spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            {shownCountries &&
              shownCountries
                .slice(0, queryOffset + 10)
                .map((country) => (
                  <CountryCard key={country.name} country={country} />
                ))}
          </>
        )}
      </div>
      <Button className="button" variant="light" onClick={() => loadMore()}>
        Carregar mais países
      </Button>
      <Button
        className="button"
        variant="light"
        onClick={() => fetchCountries()}
      >
        Resetar informações
      </Button>
    </div>
  );
};

export default CountryList;

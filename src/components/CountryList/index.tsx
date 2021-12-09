import "./style.scss";

import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import CountryCard from "../CountryCard";
import { CountryContext } from "../../contexts/CountryContext";

const CountryList: React.FC = () => {
  const [countryName, setCountryName] = useState("");
  const [queryOffset, setQueryOffset] = useState(0);

  const { countries, isLoading } = useContext(CountryContext);
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
        {isLoading && <h4>Carregando...</h4>}
        {shownCountries &&
          shownCountries
            .slice(0, queryOffset + 10)
            .map((country) => <CountryCard key={country} country={country} />)}
      </div>
      <button onClick={() => loadMore()}>Carregar mais países</button>
    </div>
  );
};

export default CountryList;

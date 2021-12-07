import "./style.scss";

import React, { SyntheticEvent, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import CountryCard from "../CountryCard";

const CountryList: React.FC = () => {
  const [countryName, setCountryName] = useState("");
  const [queryOffset, setQueryOffset] = useState(0);
  const COUNTRIES_QUERY = gql`
    query countriesQuery($offset: Int) {
      Country(first: 10, offset: $offset) {
        _id
        name
        nameTranslations(offset: 4, first: 1) {
          value
          languageCode
        }
        capital
        flag {
          emoji
        }
      }
    }
  `;
  const { loading, error, data, fetchMore } = useQuery(COUNTRIES_QUERY, {
    variables: { offset: queryOffset },
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
  }, []);

  function loadMore() {
    setQueryOffset(queryOffset + 10);
    fetchMore({
      variables: { page: queryOffset },
    });
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

  const handleSearchCountry = (searchValue: string) => {
    setCountryName(searchValue);
    setCountries([]);
    fetchMore({
      variables: { page: 0, countryName: countryName },
    });
  };

  React.useEffect(() => {
    data && setCountries((oldValues): any => [...oldValues, ...data.Country]);
  }, [data]);

  return (
    <div className="countryListContainer">
      <h2>Lista de países</h2>
      <input
        value={countryName}
        placeholder="Pesquisar um país"
        onChange={(e) => handleSearchCountry(e.target.value)}
      />
      <div className="countryList" onScroll={(e) => handleScroll(e)}>
        {loading && <h4>Carregando...</h4>}
        {countries &&
          countries.map((country) => (
            <CountryCard key={country} country={country} />
          ))}
      </div>
      <button onClick={() => loadMore()}>Carregar mais países</button>
    </div>
  );
};

export default CountryList;

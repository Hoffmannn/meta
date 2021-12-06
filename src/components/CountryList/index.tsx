import "./style.scss";

import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import CountryCard from "../CountryCard";

const CountryList: React.FC = () => {
  const [page, setPage] = useState(0);
  const COUNTRIES_QUERY = gql`
    query countriesQuery($page: Int) {
      Country(first: 5, offset: $page) {
        _id
        name
        capital
        flag {
          emoji
        }
      }
    }
  `;
  const { loading, error, data, fetchMore } = useQuery(COUNTRIES_QUERY, {
    variables: { page: page },
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", loadMore);
  }, []);

  function loadMore() {
    if (
      document.scrollingElement &&
      window.innerHeight + document.documentElement.scrollTop ===
        document.scrollingElement.scrollHeight
    ) {
      // setPage((previousPage) => previousPage + 1);
      fetchMore({
        variables: { page: page * 5 },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          console.log(previousResult);
          console.log(fetchMoreResult);
        },
      });
    }
  }

  React.useEffect(() => {
    data && setCountries((oldValues): any => [...oldValues, ...data.Country]);
  }, [data]);

  return (
    <div className="countryListContainer">
      <h2>Lista de países</h2>
      {loading && <h4>Carregando...</h4>}
      {error && <h4>erro: {JSON.stringify(error)}</h4>}
      {countries &&
        countries.map((country) => <CountryCard country={country} />)}
    </div>
  );
};

export default CountryList;

import "./style.scss";

import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import CountryCard from "../CountryCard";

const CountryList: React.FC = () => {
  const [page, setPage] = useState(0);
  const COUNTRIES_QUERY = gql`
    query {
      Country(first: 10, offset: 0) {
        _id
        name
        capital
        flag {
          emoji
        }
      }
    }
  `;
  const { loading, error, data, fetchMore } = useQuery(COUNTRIES_QUERY);

  const [countries, setCountries] = useState([]);

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

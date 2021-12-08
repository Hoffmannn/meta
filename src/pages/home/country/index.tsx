import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { gql, useQuery as useApolloQuery } from "@apollo/client";

import { CountryContext } from "../../../contexts/CountryContext";

const Country: React.FC = () => {
  const { countries, isLoading } = useContext(CountryContext);
  //Função para buscar query da URL
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();
  const countryName = query.get("name");

  const country = countries.find(
    (country) => country.name.common == countryName
  );

  return (
    <>
      <Link to="/">
        <button>Voltar</button>
      </Link>
      {country ? (
        <div>
          {/* Nome, bandeira, capital, área, população e top-level */}
          <h2>
            País - {country.translations.por.common} {country.flag}
          </h2>
          <h2>
            Capital - {country.capital ? country.capital[0] : "Sem capital"}
          </h2>
          <h2>Área - {country.area}</h2>
          <h2>População - {country.population}</h2>
          <h2>Top Level Domain - {country.tld[0]}</h2>
        </div>
      ) : (
        <h2>Carregando...</h2>
      )}
    </>
  );
};

export default Country;

import React, { createContext, useEffect, useState } from "react";

import api from "../api";

export type countryData = {
  name: {
    common: string;
  };
  flag: string;
  capital: string[];
  area: number;
  population: number;
  tld: string[];
  translations: {
    por: {
      common: string;
    };
  };
};

type CountryContextProps = {
  isLoading: boolean;
  setIsLoading: (boolean: boolean) => void;
  countries: countryData[];
  setCountries: (countries: any) => void;
};

export const CountryContext = createContext({} as CountryContextProps);

export const CountryProvider: React.FC = ({ children }) => {
  const [countries, setCountries] = useState([] as countryData[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      api.get("/all").then((res) => {
        setCountries(
          res.data.sort((a: any, b: any) =>
            a.translations.por.common.localeCompare(b.translations.por.common)
          )
        );
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <CountryContext.Provider
      value={{ countries, setCountries, isLoading, setIsLoading }}
    >
      {children}
    </CountryContext.Provider>
  );
};

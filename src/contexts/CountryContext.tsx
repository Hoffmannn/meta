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
  fetchCountries: () => void;
  updateCountries: (countries: countryData[]) => void;
};

export const CountryContext = createContext({} as CountryContextProps);

export const CountryProvider: React.FC = ({ children }) => {
  const [countries, setCountries] = useState([] as countryData[]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountries = async () => {
    setIsLoading(true);
    try {
      await api.get("/all").then((res) => {
        const countriesResponse = res.data.sort((a: any, b: any) =>
          a.translations.por.common.localeCompare(b.translations.por.common)
        );
        setCountries(countriesResponse);
        setIsLoading(false);

        localStorage.setItem("countries", JSON.stringify(countriesResponse));
      });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const updateCountries = (countries: countryData[]) => {
    setCountries(countries);
    localStorage.setItem("countries", JSON.stringify(countries));
  };

  useEffect(() => {
    const savedCountries = JSON.parse(
      localStorage.getItem("countries") as string
    ) as countryData[];
    if (savedCountries && savedCountries.length > 0) {
      setCountries(savedCountries);
      setIsLoading(false);
      return;
    }

    fetchCountries();
  }, []);

  return (
    <CountryContext.Provider
      value={{
        countries,
        isLoading,
        setIsLoading,
        updateCountries,
        fetchCountries,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

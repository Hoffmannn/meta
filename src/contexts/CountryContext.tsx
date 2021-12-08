import React, { createContext, useEffect, useState } from "react";

import api from "../api";

type CountryContextProps = {
  isLoading: boolean;
  setIsLoading: (boolean: boolean) => void;
  countries: any[];
  setCountries: (countries: any) => void;
};

export const CountryContext = createContext({} as CountryContextProps);

export const CountryProvider: React.FC = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      api.get("/all").then((res) => {
        setCountries(
          res.data.sort((a: any, b: any) =>
            a.name.common.localeCompare(b.name.common)
          )
        );
        console.log(res.data);
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

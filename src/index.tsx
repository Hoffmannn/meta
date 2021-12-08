import "./index.css";

import App from "./App";
import { CountryProvider } from "./contexts/CountryContext";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <CountryProvider>
      <App />
    </CountryProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

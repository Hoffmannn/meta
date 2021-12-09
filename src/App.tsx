import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Country from "./pages/country";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pais" element={<Country />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

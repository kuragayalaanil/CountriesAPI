import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesList from "./CountriesList";
import { useOutletContext } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const Home = () => {
  const [query, setQuery] = useState("");
  const [isDark] = useContext(ThemeContext);

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>
      <CountriesList query={query} />
    </main>
  );
};

export default Home;

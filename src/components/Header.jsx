import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Header = ({ theme }) => {
  const [isDark, setIsDark] = useContext(ThemeContext);

  return (
    <header className={`header-container ${isDark ? "dark" : ""} `}>
      <div className="header-content">
        <h2>
          <a href="" className="title">
            Where in the world?
          </a>
        </h2>
        <p
          className="theme-changer"
          onClick={() => {
            setIsDark(!isDark);
            localStorage.setItem("isDarkMode", !isDark);
          }}
        >
          <i className={`fa-solid fa-${isDark ? "sun" : "moon"}`}></i>
          &nbsp;&nbsp;{isDark ? "Light" : "Dark"} Mode
        </p>
      </div>
    </header>
  );
};

export default Header;

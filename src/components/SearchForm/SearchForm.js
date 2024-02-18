import React, { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import { OUERY_DATA } from "../../utils/constants";
import "./SearchForm.css";

function SearchForm({ handleSearchQueryData, onFilterMovies, isShortMovies }) {
  const location = useLocation();
  const [isQueryError, setIsQueryError] = useState(false);

  // ХранениНИЕ введенного запроса
  const [query, setQuery] = useState("");

  function handleQueryInputChange(event) {
    setQuery(event.target.value);
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch");
      setQuery(localQuery);
    }
  }, [location]);

  function handleEditUserInfo(event) {
    event.preventDefault();
    if (query.trim().length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      handleSearchQueryData(query);
    }
  }
  return (
    <section className="search">
      <form
        className="search__form"
        id="form"
        onSubmit={handleEditUserInfo}
        noValidate
      >
        <input
          name="query"
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          value={query || ""}
          onChange={handleQueryInputChange}
          required
        ></input>

        <button className="search__button" type="submit">
          Поиск
        </button>
      </form>

      <FilterCheckbox
        isShortMovies={isShortMovies}
        onFilterMovies={onFilterMovies}
      />
      {isQueryError && (
        <span className="search__form-error">{OUERY_DATA}</span>
      )}

      <div className="search__border-bottom"></div>
    </section>
  );
}

export default SearchForm;

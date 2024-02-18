import React, { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import { filterMovies, filterMoviesDuration } from "../../utils/filmHelpers";

function SavedMovies({ loggedIn, onDeleteCard, savedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShortMovies, setisShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  useEffect(() => {
    const moviesArrayItems = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(
      isShortMovies ? filterMoviesDuration(moviesArrayItems) : moviesArrayItems
    );
  }, [savedMovies, isShortMovies, searchQuery]);

  function handleSearchQueryData(query) {
    setSearchQuery(query);
  }

  function handleToggleShortMovies() {
    setisShortMovies(!isShortMovies);
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onFilterMovies={handleToggleShortMovies}
        handleSearchQueryData={handleSearchQueryData}
      />
      <MoviesCardList
        cards={filteredMovies}
        savedMovies={savedMovies}
        isSavedFilms={true}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;

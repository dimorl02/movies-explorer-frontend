import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import * as movies from "../../utils/MoviesApi";
import { filterMovies, filterMoviesDuration } from "../../utils/filmHelpers";
import "./Movies.css";

function Movies({ loggedIn, savedMovies, handleLikeMovie, onDeleteCard }) {
  const [initialCardsMovies, setInitialCardsMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShortMovies, setisShortMovies] = useState(false);
  const [isReqError, setisReqError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  // Получение короткометражек
  useEffect(() => {
    setisShortMovies(localStorage.getItem("shortMovies") === "true");
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      setIsNotFound(filteredMovies.length === 0);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  // Получение фильмов из локального хранилища
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialCardsMovies(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterMoviesDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  // Функция для фильтрации фильмов
  function handleFilterMovie(movies, query, short) {
    const moviesArrayItems = filterMovies(movies, query, short);
    setInitialCardsMovies(moviesArrayItems);
    setFilteredMovies(
      short ? filterMoviesDuration(moviesArrayItems) : moviesArrayItems
    );
    localStorage.setItem("movies", JSON.stringify(moviesArrayItems));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }

  // Функция поиска фильмов
  function handleSearchQueryData(query) {
    localStorage.setItem("movieSearch", query);
    localStorage.setItem("shortMovies", isShortMovies);
    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      handleFilterMovie(movies, query, isShortMovies);
    } else {
      setIsLoading(true);
      movies
        .getMovies()
        .then((cardsSavedMovies) => {
          handleFilterMovie(cardsSavedMovies, query, isShortMovies);
          setisReqError(false);
          console.log(cardsSavedMovies);
        })
        .catch((error) => {
          setisReqError(true);
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleToggleShortMovies() {
    console.log("переключение чекбокса");
    setisShortMovies(!isShortMovies);
    if (!isShortMovies) {
      const filteredCardsMovies = filterMoviesDuration(initialCardsMovies);
      setFilteredMovies(filteredCardsMovies);
    } else {
      setFilteredMovies(initialCardsMovies);
    }
    localStorage.setItem("shortMovies", !isShortMovies);
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        handleSearchQueryData={handleSearchQueryData}
        isShortMovies={isShortMovies}
        onFilterMovies={handleToggleShortMovies}
      />
      <MoviesCardList
        cards={filteredMovies}
        isLoading={isLoading}
        savedMovies={savedMovies}
        isSavedFilms={false}
        handleLikeMovie={handleLikeMovie}
        onDeleteCard={onDeleteCard}
        isReqError={isReqError}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  );
}

export default Movies;

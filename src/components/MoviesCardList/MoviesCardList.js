import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchError from "../SearchError/SearchError";
import { ERROR_TEXT_SERVER } from "../../utils/constants";
import { ERROR_DATA } from "../../utils/constants";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  isReqError,
  isNotFound,
  handleLikeMovie,
  onDeleteCard,
}) {
  const [shownMovies, setShownMovies] = useState(0);

  // Количество отображаемых карточек с фильмами
  function handleShowMoviesWidthDisplay() {
    const display = window.innerWidth;
    if (display > 1180) {
      setShownMovies(12);
    } else if (display > 767) {
      setShownMovies(8);
    } else {
      setShownMovies(5);
    }
  }

  // Эффект для обновления состояния выдачи карточек в том колличестве
  // в котором изначально заданы функцией handleShowMoviesWidthDisplay
  useEffect(() => {
    handleShowMoviesWidthDisplay();
  }, [cards]);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", handleShowMoviesWidthDisplay);
    }, 500);
  });

  // Количество отображаемых карточек на экране, при клике на кнопку Ещё
  function handleShownMoviesCounterBtnClick() {
    const display = window.innerWidth;
    if (display > 1180) {
      setShownMovies(shownMovies + 3);
    } else if (display > 767) {
      setShownMovies(shownMovies + 2);
    } else {
      setShownMovies(shownMovies + 2);
    }
  }

  // Сохраненная карточка фильма из массива сохраненных
  function handleSavedMoviesArrayItems(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  }

  const { pathname } = useLocation();

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={ERROR_DATA} />
      )}
      {isReqError && !isLoading && (
        <SearchError errorText={ERROR_TEXT_SERVER} />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    card={card}
                    cards={cards}
                    handleLikeMovie={handleLikeMovie}
                    isSavedFilms={isSavedFilms}
                    onDeleteCard={onDeleteCard}
                    saved={handleSavedMoviesArrayItems(savedMovies, card)}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
            </>
          ) : (
            <>
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={handleSavedMoviesArrayItems(savedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    onDeleteCard={onDeleteCard}
                    handleLikeMovie={handleLikeMovie}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-container">
                {cards.length > shownMovies ? (
                  <button
                    className="cards__button"
                    onClick={handleShownMoviesCounterBtnClick}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;

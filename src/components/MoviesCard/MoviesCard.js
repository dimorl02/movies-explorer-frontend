import React from "react";
import { formatMoviesDuration } from "../../utils/filmHelpers";
import deleteButton from "../../images/delete-button.svg";
import "./MoviesCard.css";

function MoviesCard({
  card,
  isSavedFilms,
  handleLikeMovie,
  saved,
  savedMovies,
  onDeleteCard,
}) {
  // Клик по фильму
  function onCardClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0]);
    } else {
      handleLikeMovie(card);
    }
  }

  // Удаление фильма
  function onDelete() {
    onDeleteCard(card);
  }

  // Класс кнопки с лайком
  const cardLikeButtonClassName = `${
    saved ? "card__like-button card__like-button_active" : "card__like-button"
  }`;

  return (
    <>
      <li className="card" key={card.id}>
        <div className="card__title-block">
          <h2 className="card__title">{card.nameRU}</h2>
          <span className="card__duration">
            {formatMoviesDuration(card.duration)}
          </span>
        </div>
        <a href={card.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="card__image"
            alt={card.nameRU}
            src={
              isSavedFilms
                ? card.image
                : `https://api.nomoreparties.co/${card.image.url}`
            }
          />
        </a>

        {isSavedFilms ? (
          <button type="button" className="card__like-rem" onClick={onDelete}>
            <img
              className="card__like-remove"
              src={deleteButton}
              alt="удалить"
            />
          </button>
        ) : (
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={onCardClick}
          ></button>
        )}
      </li>
    </>
  );
}

export default MoviesCard;

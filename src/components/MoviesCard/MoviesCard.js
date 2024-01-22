import React from "react";
import "./MoviesCard.css";

function MoviesCard() {
  return (
    <>
      <li className="card">
        <div className="card__title-block">
          <h2 className="card__title">33 слова о дизайне</h2>
          <span className="card__duration">0ч 42м</span>
        </div>

        <img alt="" className="card__image" />
        <div className="card__container">
          <button type="button" className="card__like-button"></button>
        </div>
      </li>

      <li className="card">
        <div className="card__title-block">
          <h2 className="card__title">33 слова о дизайне</h2>
          <span className="card__duration">0ч 42м</span>
        </div>

        <img alt="" className="card__image" />
        <div className="card__container">
          <button
            type="button"
            className="card__like-button card__like-button_active"
          ></button>
        </div>
      </li>

      <li className="card">
        <div className="card__title-block">
          <h2 className="card__title">33 слова о дизайне</h2>
          <span className="card__duration">0ч 42м</span>
        </div>

        <img alt="" className="card__image" />
        <div className="card__container">
          <button type="button" className="card__button-delete"></button>
        </div>
      </li>

      <li className="card">
        <div className="card__title-block">
          <h2 className="card__title">33 слова о дизайне</h2>
          <span className="card__duration">0ч 42м</span>
        </div>

        <img alt="" className="card__image" />
        <div className="card__container">
          <button type="button" className="card__like-button"></button>
        </div>
      </li>

      <li className="card">
        <div className="card__title-block">
          <h2 className="card__title">33 слова о дизайне</h2>
          <span className="card__duration">0ч 42м</span>
        </div>

        <img alt="" className="card__image" />
        <div className="card__container">
          <button type="button" className="card__like-button"></button>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;

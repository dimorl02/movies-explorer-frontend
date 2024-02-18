import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import account from "../../images/profile.png";

function Navigation({ handleClose }) {
  const setActiveColorLink = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link";

  return (
    <div className="navigation__page-overlay">
      <div className="navigation__overlay-container"></div>
      <div className="navigation__menu">
        <button
          className="navigation__close-button"
          onClick={handleClose}
        ></button>
        <nav className="navigation__links">
          <NavLink to="/" className={setActiveColorLink} onClick={handleClose}>
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={setActiveColorLink}
            onClick={handleClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={setActiveColorLink}
            onClick={handleClose}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__account-button">
          <img src={account} alt="аккаунт" />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;

import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import account from "../../images/profile.png";
import menu from "../../images/menu-button.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  // Функция смены цвета активной ссылки
  const setActiveColorLink = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button";

  const [isOpened, setIsOpened] = React.useState(false);

  function handleOpen() {
    setIsOpened(true);
  }

  function handleClose() {
    setIsOpened(false);
  }

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип сайта" />
          </Link>
          <div className="header__button-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-green">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header header_gray" id="header-gray">
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип сайта" />
          </Link>
          <div className="header__button-container_films">
            <NavLink to="/movies" className={setActiveColorLink}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={setActiveColorLink}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__button-container">
            <Link to="/profile" className="header__account-button">
              <img
                className="header__account-image"
                src={account}
                alt="изображение кнопки аккаунта"
              />
            </Link>
            <button className="header__menu-button" onClick={handleOpen}>
              <img src={menu} alt="меню" />
            </button>
          </div>
          {isOpened ? <Navigation handleClose={handleClose} /> : ""}
        </header>
      )}
    </>
  );
}

export default Header;

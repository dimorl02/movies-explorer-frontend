import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as api from "../../utils/MainApi";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import InfoTooltipEditProfile from "../InfoTooltipEditProfile/InfoTooltipEditProfile";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [
    isInfoTooltipEditProfilePopupOpen,
    setInfoTooltipEditProfilePopupOpen,
  ] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Проверяю токен в локальном хранилище, если он есть, то получаю данные
  // пользователя из локального хранилища после проверки запроса апи getContent
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            localStorage.removeItem("allMovies");
          }
          navigate(path);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // Вывод данных если авторизован
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((profileInfoEdit) => {
          setCurrentUser(profileInfoEdit);
        })
        .catch((error) => {
          console.log(error);
        });
      api
        .getMovies()
        .then((cardsSavedMovies) => {
          setSavedMovies(cardsSavedMovies.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  // Вывод данных если авторизован
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((profileInfoEdit) => {
          setCurrentUser(profileInfoEdit);
        })
        .catch((error) => {
          console.log(error);
        });
      api
        .getMovies()
        .then((cardsSavedMovies) => {
          setSavedMovies(cardsSavedMovies.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  // Регистрируемся
  function handleRegistrationUser({ name, email, password }) {
    api
      .register(name, email, password)
      //console.log(name, email, password)
      .then(() => {
        handleLoginUser({ email, password });
        setInfoToolTipPopupOpen(true);
        setIsSuccess(true);
      })
      .catch((error) => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
        console.log(error);
      });
  }

  // Логин
  function handleLoginUser({ email, password }) {
    setIsLoading(true);
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setInfoToolTipPopupOpen(true);
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Поставить лайк фильму
  function handleLikeMovie(card) {
    api
      .postCard(card)
      .then((newMovieLike) => {
        setSavedMovies([newMovieLike, ...savedMovies]);
      })
      .catch((error) => {
        setIsSuccess(false);
        console.log(error);
        handleErrorUnauthorized(error);
      });
  }

  // Удаление сохраненного фильма
  function handleRemoveFilm(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== card._id)
        );
      })
      .catch((error) => {
        setIsSuccess(false);
        console.log(error);
        handleErrorUnauthorized(error);
      });
  }

  // Редактирования данных пользователя
  function handleEditProfileInfo(userInfo) {
    setIsLoading(true);
    api
      .setUserInfo(userInfo)
      .then((data) => {
        setInfoTooltipEditProfilePopupOpen(true);
        setIsUpdate(true);
        setCurrentUser(data);
      })
      .catch((error) => {
        setInfoTooltipEditProfilePopupOpen(true);
        setIsUpdate(false);
        console.log(error);
        handleErrorUnauthorized(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Обработка ошибки авторизации
  function handleErrorUnauthorized(error) {
    if (error === "Error: 401") {
      handleLogoutMovieSite();
    }
  }

  // Закрываю попапы в closeAllPopups
  function closeAllPopups() {
    setInfoToolTipPopupOpen(false);
    setInfoTooltipEditProfilePopupOpen(false);
  }

  // Две константы попапов присваиваю константе isOpen, чтобы отслеживать их состояние в юзэффекте
  const isOpen = isInfoToolTipPopupOpen || isInfoTooltipEditProfilePopupOpen;

  // Отслеживаю состояния попапов и закрываю их по клавише ESC
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  // Закрываю попапы кликом по оверлею
  function closeByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

  // При выходе из приложения чищу локальное хранилище с данными
  const handleLogoutMovieSite = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("movies");
    localStorage.removeItem("movieSearch");
    localStorage.clear();
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login
                    isLoading={isLoading}
                    onAuthorization={handleLoginUser}
                  />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    isLoading={isLoading}
                    handleRegistrationUser={handleRegistrationUser}
                  />
                )
              }
            />
            <Route path={"*"} element={<NotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  loggedIn={isLoggedIn}
                  component={Movies}
                  handleLikeMovie={handleLikeMovie}
                  onDeleteCard={handleRemoveFilm}
                  savedMovies={savedMovies}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  loggedIn={isLoggedIn}
                  component={SavedMovies}
                  savedMovies={savedMovies}
                  onDeleteCard={handleRemoveFilm}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  loggedIn={isLoggedIn}
                  component={Profile}
                  isLoading={isLoading}
                  onUpdateUser={handleEditProfileInfo}
                  signOut={handleLogoutMovieSite}
                />
              }
            />
          </Routes>
          <InfoTooltip
            isSuccess={isSuccess}
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
          />
          <InfoTooltipEditProfile
            isUpdate={isUpdate}
            isOpen={isInfoTooltipEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

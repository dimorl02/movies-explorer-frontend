import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { PATTERN_REGEX_EMAIL } from "../../utils/constants";
import "./Profile.css";
import useForm from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ loggedIn, isLoading, onUpdateUser, signOut }) {
  const currentUser = useContext(CurrentUserContext);

  const [isLastValues, setIsLastValues] = useState(false);

  // Xук useForm для управления формами
  const { enteredValues, errors, handleChangeInput, isFormValid, resetForm } =
    useForm();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  function handleEditUserInfo(event) {
    event.preventDefault();
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  }

  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setIsLastValues(true);
    } else {
      setIsLastValues(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues]);
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form
          id="form"
          className="profile__form"
          onSubmit={handleEditUserInfo}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              placeholder="имя"
              onChange={handleChangeInput}
              value={enteredValues.name || ""}
              required
            />
            <span className="profile__input-error">{errors.name}</span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              placeholder="почта"
              onChange={handleChangeInput}
              pattern={PATTERN_REGEX_EMAIL}
              value={enteredValues.email || ""}
              required
            />
            <span className="profile__input-error">{errors.email}</span>
          </label>

          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? "profile__button-save form__button-save_inactive"
                : "profile__button-save"
            }
          >
            Редактировать
          </button>
          <Link
            className="profile__exit"
            to="/profile"
            type="button"
            onClick={signOut}
          >
            Выйти из аккаунта
          </Link>
        </form>
      </section>
    </>
  );
}

export default Profile;

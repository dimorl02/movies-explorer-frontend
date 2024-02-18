import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Form.css";

function Form({
  title,
  children,
  linkText,
  link,
  question,
  buttonText,
  isLoading,
  isDisablBtn,
  onSubmit,
}) {
  return (
    <div className="form__block">
      <Link to="/" className="logo">
        <img src={logo} alt="лого" />
      </Link>
      <h3 className="form__title">{title}</h3>
      <form className="form" id="form" onSubmit={onSubmit} noValidate>
        {children}

        <button
          type="submit"
          className={
            isDisablBtn || isLoading
              ? "form__button-save form__button-save_inactive"
              : "form__button-save"
          }
          disabled={isDisablBtn ? true : false}
        >
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {question}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </div>
  );
}

export default Form;

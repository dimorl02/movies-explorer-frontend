import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Form.css";

function Form({ linkText, link, children, title, buttonText, question }) {
  return (
    <div className="form__block">
      <Link to="/" className="logo">
        <img src={logo} alt="лого" />
      </Link>
      <h3 className="form__title">{title}</h3>
      <form className="form" noValidate>
        {children}
        <button type="submit" className="form__button-save">
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

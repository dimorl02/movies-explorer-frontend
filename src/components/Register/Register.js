import React from "react"
import Form from "../Form/Form"
import "../Form/Form.css"
import useForm from "../../hooks/useForm"
import { PATTERN_REGEX_EMAIL } from "../../utils/constants"

function Register({ isLoading, handleRegistrationUser }) {
  // Хук useForm
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function handleEditUserInfo(event) {
    event.preventDefault()
    handleRegistrationUser({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
    link="/signin"
    title="Добро пожаловать!"
    buttonText="Зарегистрироваться"
    question="Уже зарегистрированы?"
    linkText=" Войти"
    onSubmit={handleEditUserInfo}
    isDisablBtn={!isFormValid}
    isLoading={isLoading}
    >
      <label className="form__label">
        Имя
        <input
          name="name"
          className="form__input"
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          placeholder="имя" 
          onChange={handleChangeInput}
          value={enteredValues.name || ""}
          required
        />
        <span className="form__input-error">{errors.name}</span>
      </label>
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          placeholder="почта" 
          onChange={handleChangeInput}
          pattern={PATTERN_REGEX_EMAIL}
          value={enteredValues.email || ""}
          required
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          placeholder="пароль"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
          minLength="6"
          maxLength="12"
          required 
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Register

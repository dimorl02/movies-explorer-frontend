import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__list">
        <a
          href="https://github.com/dimorl02"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__subtitle">Статичный сайт</p>
          <img
            className="portfolio__image"
            src={arrow}
            alt="стрелка для ссылки"
          />
        </a>
        <a
          href="https://github.com/dimorl02/react-mesto-api-full-gha"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__subtitle">Адаптивный сайт</p>
          <img
            className="portfolio__image"
            src={arrow}
            alt="стрелка для ссылки"
          />
        </a>
        <a
          href="https://github.com/dimorl02/react-mesto-api-full-gha"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__subtitle">Одностраничное приложение</p>
          <img
            className="portfolio__image"
            src={arrow}
            alt="стрелка для ссылки"
          />
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;

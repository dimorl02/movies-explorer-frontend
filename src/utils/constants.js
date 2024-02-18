// Константа определяет значение, которое используется
// в фильтре длительности фильмов по времени(40 минут)
const MAX_SHORT_MOVIE_DURATION = 40;

const ERROR_TEXT_SERVER =
  "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
const OUERY_DATA = "Нужно ввести ключевое слово";
const ERROR_DATA = "Ничего не найдено";
// Регулярное выражение для проверки email
const PATTERN_REGEX_EMAIL = "[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.[a-z]{2,}";

//Экспорт констант в другие части приложения
export {
  MAX_SHORT_MOVIE_DURATION,
  ERROR_TEXT_SERVER,
  OUERY_DATA,
  ERROR_DATA,
  PATTERN_REGEX_EMAIL,
};

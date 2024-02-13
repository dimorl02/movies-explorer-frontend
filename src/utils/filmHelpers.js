import { MAX_SHORT_MOVIE_DURATION } from "./constants"

// Функция для проверки ответа от сервера
export const handleCheckResponseServer = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

// Длительность фильмов
export function filterMoviesDuration(movies) {
  return movies.filter((movie) => movie.duration < MAX_SHORT_MOVIE_DURATION)
}

// Функция formatMoviesDuration принимает значение длительности duration
// в минутах и конвертирует его в формат часы:минуты
export function formatMoviesDuration(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч${minutes}м`
}

// Короткометражки
export function filterMovies(movies, query) {
  const moviesQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim()
    const movieEn = String(movie.nameEN).toLowerCase().trim()
    const userQuery = query.toLowerCase().trim()
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    )
  })
  return moviesQuery
}

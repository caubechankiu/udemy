import url from "../url"

export const getAllGenres = (callback) => {
  $.get(url.GET_ALL_GENRES, callback)
}
export const getAllGenres = (callback) => {
  $.get('/api/genres/all', callback)
}
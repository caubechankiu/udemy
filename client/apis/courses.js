export const getCoursesByGenre = ({ genreid, success, xhr }) => {
  $.ajax({
    method: "GET",
    url: '/api/courses/get-courses-genre/' + genreid,
    success,
    xhr,
  })
}

export const getCoursesBySubGenre = ({ subgenreid, data, success, xhr }) => {
  $.ajax({
    method: "POST",
    url: '/api/courses/get-courses-subgenre/' + subgenreid,
    data,
    success,
    xhr,
  })
}

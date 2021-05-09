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

export const getCoursesSearch = ({ data, success, xhr }) => {
  $.ajax({
    method: "POST",
    url: '/api/courses/search',
    data,
    success,
    xhr,
  })
}

export const getCoursesHomepage = ({ success, xhr }) => {
  $.ajax({
    method: "GET",
    url: '/api/courses/get-courses-homepage',
    success,
    xhr,
  })
}

export const getCoursesRelateLecture = (data, callback) => {
  $.post('/api/courses/get-courses-relate-lecturer', data, callback);
}

export const addReview = (data, callback) => {
  $.post('/api/course/add-review', data, callback);
}

export const getReview = (data, callback) => {
  $.post('/api/course/get-review', data, callback);
}

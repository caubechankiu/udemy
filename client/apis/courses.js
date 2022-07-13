import url from "../url"

export const getCoursesByGenre = ({ genreid, success, xhr }) => {
  $.ajax({
    method: "GET",
    url: url.GET_COURSES_BY_GENRE + genreid,
    success,
    xhr,
  })
}

export const getCoursesBySubGenre = ({ subgenreid, data, success, xhr }) => {
  $.ajax({
    method: "GET",
    url: url.GET_COURSES_BY_SUBGENRE + subgenreid,
    data,
    success,
    xhr,
  })
}

export const getCoursesSearch = ({ data, success, xhr }) => {
  $.ajax({
    method: "GET",
    url: url.GET_COURSES_SEARCH,
    data,
    success,
    xhr,
  })
}

export const getCoursesHomepage = ({ success, xhr }) => {
  $.ajax({
    method: "GET",
    url: url.GET_COURSES_HOME_PAGE,
    success,
    xhr,
  })
}

export const getCoursesRelateLecture = (data, callback) => {
  $.get(url.GET_COURSES_RELATE_LECTURER, data, callback);
}

export const addReview = (data, callback) => {
  $.post(url.ADD_COURSE_REVIEW, JSON.stringify(data), callback);
}

export const getReview = (data, callback) => {
  $.get(url.GET_COURSE_REVIEW, data, callback);
}

export const getCourseIntro = (data, callback) => {
  $.get(url.GET_COURSE_INTRO, data, callback);
}

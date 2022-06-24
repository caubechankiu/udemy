// const BASE_URL = "http://localhost:3001";
const BASE_URL = "http://192.168.31.107:3001";


module.exports = {
    SIGNUP_VERIFY: `${BASE_URL}/auth/signup-verify`, // NEW
    // SIGNUP_VERIFY: "/api/user/verify", // OLD

    LOGIN: `${BASE_URL}/auth/login`, // NEW
    // LOGIN: '/api/authentication/login', // OLD

    SIGNUP: `${BASE_URL}/auth/signup`, // NEW
    // SIGNUP: '/api/authentication/signup', // OLD

    // FORGOT_PASSWORD: '/api/authentication/forgotpassword', // NEW
    FORGOT_PASSWORD: '/api/authentication/forgotpassword', // OLD

    // LOGOUT: '/api/authentication/logout', // NEW
    LOGOUT: '/api/authentication/logout', // OLD

    GET_USER_INFO: `${BASE_URL}/profile/getInfo`, // NEW
    // GET_USER_INFO: 'api/user/getuserinfo', // OLD

    // GET_ALL_GENRES: '/api/genres/all', // NEW
    GET_ALL_GENRES: '/api/genres/all', // OLD

    // GET_COURSES_BY_GENRE: '/api/courses/get-courses-genre/', // NEW
    GET_COURSES_BY_GENRE: '/api/courses/get-courses-genre/', // OLD

    // GET_COURSES_BY_SUBGENRE: '/api/courses/get-courses-subgenre/', // NEW
    GET_COURSES_BY_SUBGENRE: '/api/courses/get-courses-subgenre/', // OLD

    // GET_COURSES_SEARCH: '/api/courses/search', // NEW
    GET_COURSES_SEARCH: '/api/courses/search', // OLD

    // GET_COURSES_HOME_PAGE: '/api/courses/get-courses-homepage', // NEW
    GET_COURSES_HOME_PAGE: '/api/courses/get-courses-homepage', // OLD

    // GET_COURSES_RELATE_LECTURER: '/api/courses/get-courses-relate-lecturer', // NEW
    GET_COURSES_RELATE_LECTURER: '/api/courses/get-courses-relate-lecturer', // OLD

    // ADD_COURSE_REVIEW: '/api/course/add-review', // NEW
    ADD_COURSE_REVIEW: '/api/course/add-review', // OLD

    // GET_COURSE_REVIEW: '/api/course/get-review', // NEW
    GET_COURSE_REVIEW: '/api/course/get-review', // OLD

    // GET_COURSE_INTRO: '/api/course/get-course-info', // NEW
    GET_COURSE_INTRO: '/api/course/get-course-info', // OLD
}

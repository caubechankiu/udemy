const BASE_URL = "http://localhost:3001";
// const BASE_URL = "http://192.168.31.107:3001";


module.exports = {
    SIGNUP_VERIFY: `${BASE_URL}/auth/signup-verify`, // NEW
    // SIGNUP_VERIFY: "/api/user/verify", // OLD

    LOGIN: `${BASE_URL}/auth/login`, // NEW
    // LOGIN: '/api/authentication/login', // OLD

    SIGNUP: `${BASE_URL}/auth/signup`, // NEW
    // SIGNUP: '/api/authentication/signup', // OLD

    FORGOT_PASSWORD: '/api/authentication/forgotpassword', // NEW
    // FORGOT_PASSWORD: '/api/authentication/forgotpassword', // OLD

    // LOGOUT: '/api/authentication/logout', // NEW
    LOGOUT: '/api/authentication/logout', // OLD

    // GET_USER_INFO: `${BASE_URL}/profile/getInfo`, // NEW
    GET_USER_INFO: '/api/user/getuserinfo', // OLD

    EDIT_PROFILE: `${BASE_URL}/profile/editProfile`, // NEW
    // EDIT_PROFILE: '/api/user/edit-profile', // OLD

    CHANGE_PASSWORD: `${BASE_URL}/profile/changePassword`, // NEW
    // CHANGE_PASSWORD: '/api/user/edit-account', // OLD

    SET_PAYPAL_ID: `${BASE_URL}/profile/setPaypalId`, // NEW
    // SET_PAYPAL_ID: '/api/user/set-paypalid', // OLD

    GET_PAYMENT: `${BASE_URL}/payment/getPayment`, // NEW
    // GET_PAYMENT: '/api/user/get-payment', // OLD

    WITHDRAW: `${BASE_URL}/payment/withdraw`, // NEW
    // WITHDRAW: '/api/user/withdraw', // OLD

    DEPOSIT: `${BASE_URL}/payment/deposit`, // NEW
    // DEPOSIT: '/api/user/deposit-funds', // OLD

    DELETE_PAYMENT: `${BASE_URL}/payment/deletePayment`, // NEW
    // DELETE_PAYMENT: '/api/user/delete-payment', // OLD


    GET_ALL_GENRES: `${BASE_URL}/course/genreAll`, // NEW
    // GET_ALL_GENRES: '/api/genres/all', // OLD


    GET_COURSES_BY_GENRE: `${BASE_URL}/course/getCoursesGenre/`, // NEW
    // GET_COURSES_BY_GENRE: '/api/courses/get-courses-genre/', // OLD


    GET_COURSES_BY_SUBGENRE: `${BASE_URL}/course/getCoursesSubgenre/`, // NEW
    // GET_COURSES_BY_SUBGENRE: '/api/courses/get-courses-subgenre/', // OLD 


    GET_COURSES_HOME_PAGE: `${BASE_URL}/course/getCoursesHomePage`, // NEW
    // GET_COURSES_HOME_PAGE: '/api/courses/get-courses-homepage', // OLD


    GET_COURSES_RELATE_LECTURER: `${BASE_URL}/course/getCoursesRelate`, // NEW
    // GET_COURSES_RELATE_LECTURER: '/api/courses/get-courses-relate-lecturer', // OLD 


    GET_COURSE_INTRO: `${BASE_URL}/course/getCourseInfo`, // NEW
    // GET_COURSE_INTRO: '/api/course/get-course-info', // OLD

    GET_COURSES_SEARCH: `${BASE_URL}/course/getCoursesSearch`, // NEW
    // GET_COURSES_SEARCH: '/api/courses/search', // OLD


    //GET_COURSE_REVIEW: '/api/course/getReview', // NEW
    GET_COURSE_REVIEW: '/api/course/get-review', //OLD   

    // CREATE_COURSE: `${BASE_URL}/mycourse/createCourse`, // NEW
    CREATE_COURSE: 'api/user/createcourse', //OLD   

    // GET_ALL_MYCOURSES: `${BASE_URL}/mycourse/getMyCourses`, // NEW
    GET_ALL_MYCOURSES: 'api/user/get-all-mycourses', //OLD   

    

}

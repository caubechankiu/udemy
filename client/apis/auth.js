import url from '../url'
export const login = (data, callback) => {
  $.post(url.LOGIN, JSON.stringify(data), callback);
};

export const signup = (data, callback) => {
  $.post(url.SIGNUP, JSON.stringify(data), callback);
};

export const forgotPassword = (data, callback) => {
  $.post(url.FORGOT_PASSWORD, JSON.stringify(data), callback);
};

export const logout = (callback) => {
  $.get(url.LOGOUT, callback);
};

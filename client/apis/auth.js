export const login = (data, callback) => {
  $.post('/authentication/login', JSON.stringify(data), callback);
};

export const signup = (data, callback) => {
  $.post('/authentication/signup', JSON.stringify(data), callback);
};

export const forgotPassword = (data, callback) => {
  $.post('/authentication/forgotpassword', JSON.stringify(data), callback);
};

export const logout = (callback) => {
  $.get('/authentication/logout', callback);
};

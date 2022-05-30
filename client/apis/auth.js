export const login = (data, callback) => {
  $.post('/api/authentication/login', JSON.stringify(data), callback);
};

export const signup = (data, callback) => {
  $.post('/api/authentication/signup', JSON.stringify(data), callback);
};

export const forgotPassword = (data, callback) => {
  $.post('/api/authentication/forgotpassword', JSON.stringify(data), callback);
};

export const logout = (callback) => {
  $.get('/api/authentication/logout', callback);
};

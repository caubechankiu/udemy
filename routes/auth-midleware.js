var jwt = require('jsonwebtoken')
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    req.isAuthenticated = () => false;
  } else {
    const access_token = authorization.split(' ')[1];
    if (!access_token) {
      req.isAuthenticated = () => false;
    } else {
      const payload = jwt.verify(access_token, process.env.JWT_SECRET);
      if (!payload) {
        req.isAuthenticated = () => false;
      } else {
        req.isAuthenticated = () => true;
        const user = await User.findOne({ _id: payload._id }).select({ password: 0, __v: 0, updatedAt: 0, createdAt: 0, mycourses: 0 });
        req.user = user;
      }
    }
  }
  next()
}

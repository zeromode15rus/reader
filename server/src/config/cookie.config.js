const jwtConfig = require('./jwt.config');

module.exports = {
  refresh: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);

const sessionMiddleware = session({
  store: new PgSession(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
});

module.exports = sessionMiddleware;

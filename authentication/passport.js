const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db');

const checkPassword = password => user =>
  bcrypt.compare(password, user.password).then(isEqual => {
    if (isEqual) {
      return user;
    }
    return Promise.reject(new Error('Invalid credentials.'));
  });

const verifyCallback = (username, password, done) => {
  User.findByUserName(username)
    .then(checkPassword(password))
    .then(user => done(null, user))
    .catch(error => done(null, false, error.message));
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.find(id)
    .then(user => done(null, user))
    .catch(error => done(error, {}));
});

passport.use(new LocalStrategy(verifyCallback));

const authSettings = {
  successRedirect: '/lobby',
  failureRedirect: '/users/login'
};

module.exports = {
  passport,
  authenticate: passport.authenticate('local', authSettings)
};

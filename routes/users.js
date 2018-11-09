const express = require('express');
const { authenticate } = require('../authentication/passport');
const { User } = require('../db');

const router = express.Router();

router.get('/register', (_, response) => {
  response.render('auth/register');
});

router.post('/register', (request, response, next) => {
  const { username, password } = request.body;

  User.register(username, password).then(user => {
    request.login(user, error => {
      if (error) {
        return next(error);
      }
      return response.redirect('/lobby');
    });
  });
});

router.get('/login', (_, response) => {
  response.render('auth/login');
});

router.post('/login', authenticate);

router.get('/logout', (request, response) => {
  request.logout();
  response.redirect('/');
});

module.exports = router;

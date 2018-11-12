const express = require('express');
const isAuthenticated = require('../authentication/isAuthenticated');

const joinGame = require('./api/games/join');

const router = express.Router();

router.get('/:id', isAuthenticated, (request, response) => {
  const { id } = request.params;

  response.render('games/index', { id });
});

router.get('/:id/join', isAuthenticated, joinGame);

module.exports = router;

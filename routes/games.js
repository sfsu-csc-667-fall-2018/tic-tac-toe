const express = require('express');
const isAuthenticated = require('../authentication/isAuthenticated');

const router = express.Router();

router.get('/:id', isAuthenticated, (request, response) => {
  const { id } = request.params;

  response.render('games/index', { id });
});

module.exports = router;

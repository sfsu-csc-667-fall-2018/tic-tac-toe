const express = require('express');
const isAuthenticated = require('../authentication/isAuthenticated');

const router = express.Router();

router.get('/', (_, response) => {
  response.render('index');
});

router.get('/lobby', isAuthenticated, (request, response) => {
  response.render('lobby/index');
});

module.exports = router;

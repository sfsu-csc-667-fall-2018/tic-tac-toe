const express = require('express');
const isAuthenticated = require('../../authentication/isAuthenticated');

const router = express.Router();

router.get('/', isAuthenticated, (request, response) => {
  const { id: userId } = request.user;

  response.json({ games: [], currentUserId: userId });
});

module.exports = router;

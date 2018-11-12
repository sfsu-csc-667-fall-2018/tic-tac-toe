const express = require('express');
const moment = require('moment');

const isAuthenticated = require('../../authentication/isAuthenticated');
const { io } = require('../../messaging');

const router = express.Router();

router.post('/:roomIdentifier', isAuthenticated, (request, response) => {
  const { roomIdentifier } = request.params;
  const { username } = request.user;
  const { message } = request.body;

  io.emit(`chat:${roomIdentifier}`, {
    username,
    message,
    timestamp: moment().format('HH:mm:ss')
  });

  response.sendStatus(204);
});

module.exports = router;

const express = require('express');

const listGames = require('./list');
const createGame = require('./create');
const getInfo = require('./info');

const isAuthenticated = require('../../../authentication/isAuthenticated');

const router = express.Router();

router.get('/', isAuthenticated, listGames);
router.get('/create', isAuthenticated, createGame);
router.get('/:id/info', isAuthenticated, getInfo);

module.exports = router;

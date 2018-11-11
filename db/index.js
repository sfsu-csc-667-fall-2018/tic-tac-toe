const pgp = require('pg-promise')();

const connection = pgp(process.env.DATABASE_URL);

const userInit = require('./user');
const testInit = require('./test');
const gameInit = require('./games');

module.exports = {
  User: userInit(connection),
  Test: testInit(connection),
  Game: gameInit(connection)
};

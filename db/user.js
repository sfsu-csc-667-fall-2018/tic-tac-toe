const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const find = db => id =>
  db.one('SELECT id, username FROM users WHERE id=$1', [id]);

const findByUserName = db => username =>
  db.one('SELECT * FROM users WHERE username=$1', [username]);

const register = db => (username, password) =>
  bcrypt
    .hash(password, SALT_ROUNDS)
    .then(hash =>
      db.one(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
        [username, hash]
      )
    );

const userInit = db => ({
  find: find(db),
  findByUserName: findByUserName(db),
  register: register(db)
});

module.exports = userInit;

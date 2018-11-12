const { BAD_BUT_SIMPLE_OPEN_GAMES_QUERY, PLAYER_QUERY } = require('./queries');

const openGames = db => userId =>
  db.any(BAD_BUT_SIMPLE_OPEN_GAMES_QUERY, [userId]);

const createGame = db => userId =>
  db
    .one('INSERT INTO games DEFAULT VALUES RETURNING id')
    .then(({ id: gameId }) =>
      db.one(
        'INSERT INTO game_users VALUES ($1, $2, 1, true) RETURNING game_id',
        [gameId, userId]
      )
    )
    .then(({ game_id: gameId }) =>
      db.one(`${BAD_BUT_SIMPLE_OPEN_GAMES_QUERY} AND games.id=$1`, [gameId])
    );

const players = db => gameId => db.any(PLAYER_QUERY, [gameId]);

// This would be better done with a transaction but lazy
const join = db => (gameId, userId) =>
  db
    .none('INSERT INTO game_users VALUES ($1, $2, 2)', [gameId, userId])
    .then(_ => db.any('SELECT * FROM game_users WHERE game_id=$1', [gameId]))
    .then(gamePlayers => {
      if (gamePlayers.length > 2) {
        // Already a full game, roll it back
        return Promise.reject(new Error('Game is full'));
      }
      return Promise.resolve(gameId);
    })
    .catch(error => {
      db.none('DELETE FROM game_users WHERE game_id=$1 AND user_id=$2', [
        gameId,
        userId
      ]).then(_ => Promise.reject(error));
    });

const gameInit = db => ({
  openGames: openGames(db),
  create: createGame(db),
  players: players(db),
  join: join(db)
});

module.exports = gameInit;

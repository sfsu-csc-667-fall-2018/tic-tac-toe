const PLAYER_COUNT_SUBQUERY =
  '(SELECT COUNT(*) FROM game_users WHERE game_users.game_id=games.id)';

const BAD_BUT_SIMPLE_OPEN_GAMES_QUERY = `SELECT
     *,
     (SELECT NOT COUNT(*) = 0 FROM game_users WHERE user_id=$1 AND turn_order=1 AND game_id=games.id) AS owner,
     ${PLAYER_COUNT_SUBQUERY} AS player_count
   FROM games
   WHERE completed=false AND ${PLAYER_COUNT_SUBQUERY} < 2`;

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

const gameInit = db => ({
  openGames: openGames(db),
  create: createGame(db)
});

module.exports = gameInit;

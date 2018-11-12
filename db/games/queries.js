const PLAYER_COUNT_SUBQUERY =
  '(SELECT COUNT(*) FROM game_users WHERE game_users.game_id=games.id)';

const BAD_BUT_SIMPLE_OPEN_GAMES_QUERY = `SELECT
     *,
     (SELECT NOT COUNT(*) = 0 FROM game_users WHERE user_id=$1 AND turn_order=1 AND game_id=games.id) AS owner,
     ${PLAYER_COUNT_SUBQUERY} AS player_count
   FROM games
   WHERE completed=false AND ${PLAYER_COUNT_SUBQUERY} < 2`;

const PLAYER_QUERY = `
  SELECT u.username, u.id, md5(u.username) AS userhash FROM users u, game_users
  WHERE game_users.user_id=u.id AND game_users.game_id=$1 ORDER BY game_users.turn_order
`;
module.exports = {
  BAD_BUT_SIMPLE_OPEN_GAMES_QUERY,
  PLAYER_QUERY
};

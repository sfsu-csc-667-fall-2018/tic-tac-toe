const moment = require('moment');

const { Game } = require('../../../db');

const list = (request, response) => {
  const { id: userId } = request.user;

  Game.openGames(userId)
    .then(games => {
      response.json({
        games: games.map(game => ({
          ...game,
          timestamp: moment(game.createdAt).format('HH:mm:ss')
        })),
        currentUserId: userId
      });
    })
    .catch(error => {
      /* no-op, but we should display an error message */
      // eslint-disable-next-line no-console
      console.log(error);
    });
};

module.exports = list;

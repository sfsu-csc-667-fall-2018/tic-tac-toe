const { Game } = require('../../../db');
const { io } = require('../../../messaging');

const join = (request, response) => {
  const { id: userId } = request.user;
  const { id: gameId } = request.params;

  Game.join(gameId, userId)
    .then(_ => {
      io.emit('game:full', { gameId });

      response.redirect(`/games/${gameId}`);
    })
    .catch(_ => {
      // Failed, redirect to lobby, TODO flash error message
      response.redirect('/lobby');
    });
};

module.exports = join;

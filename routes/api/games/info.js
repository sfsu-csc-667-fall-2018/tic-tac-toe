const { Game } = require('../../../db');

const info = (request, response) => {
  const { id: userId } = request.user;
  const { id: gameId } = request.params;

  Game.players(gameId).then(players => {
    if (players.find(p => p.id === userId) === undefined) {
      response.json([]);
    } else {
      const displayPlayers = players.map(({ username, userhash }) => ({
        playerName: username,
        playerHash: userhash
      }));

      if (displayPlayers.length === 1) {
        displayPlayers.push({
          playerName: 'Waiting for Player',
          playerHash: ''
        });
      }

      response.json(displayPlayers);
    }
  });
};

module.exports = info;

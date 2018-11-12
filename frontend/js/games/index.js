/* eslint-env browser */

import api from '../api';
import socket from '../messaging';

import playerInfoTemplate from '../templates/playerInfo.pug';

const renderPlayers = players => {
  const infoElement = document.querySelector('.player-info');

  infoElement.innerHTML = players
    .map((player, index) => playerInfoTemplate({ ...player, index }))
    .join('');
};

const startGame = gameId => {
  api
    .getGameInfo(gameId)
    .then(renderPlayers)
    .then(_ => {
      // TODO: here's where we start the game
    });
};

const initializeSockets = gameId => {
  socket.on('game:full', ({ gameId: filledGameId }) => {
    if (gameId === filledGameId) {
      startGame(gameId);
    }
  });
};

const initializeGame = gameId => {
  initializeSockets(gameId);

  api.getGameInfo(gameId).then(renderPlayers);
};

export default initializeGame;

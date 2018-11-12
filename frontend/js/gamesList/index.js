/* eslint-env browser */

import api from '../api';
import socket from '../messaging';

import gameEntryTemplate from '../templates/gameEntry.pug';

const initializeSockets = element => () => {
  socket.on('game:created', game => {
    // eslint-disable-next-line no-param-reassign
    element.innerHTML = `
      ${element.innerHTML}
      ${gameEntryTemplate(game)}
    `;
  });

  socket.on('game:full', ({ gameId }) => {
    document.querySelector(`[data-id="${gameId}"]`).remove();
  });
};

const renderGames = element => ({ games, currentUserId }) => {
  // eslint-disable-next-line no-param-reassign
  element.innerHTML = games
    .map(game => gameEntryTemplate(game, currentUserId))
    .join('');
};

const initializeGamesList = element => {
  api
    .getGamesList()
    .then(renderGames(element))
    .then(initializeSockets(element));
};

export default initializeGamesList;

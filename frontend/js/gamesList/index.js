/* eslint-env browser */

import api from '../api';
import socket from '../messaging';

const initializeSockets = () => {
  socket.on('games:created', data => {
    // eslint-disable-next-line no-console
    console.log(data);
  });
};

const renderGames = element => gamesList => {
  gamesList.forEach(entry => {
    const p = document.createElement('p');
    p.innerText = entry;

    element.appendChild(p);
  });
};

const initializeGamesList = element => {
  api
    .getGamesList()
    .then(renderGames(element))
    .then(initializeSockets);
};

export default initializeGamesList;

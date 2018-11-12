/* eslint-env browser */

import initializeChat from './chat';
import initializeGame from './games';

const gameId = document.querySelector('input.game-id').value;

initializeChat(
  document.querySelector('input.chat-message'),
  document.querySelector('div.chat-display'),
  gameId
);

initializeGame(gameId);

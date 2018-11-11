/* eslint-env browser */

import initializeChat from './chat';
import initializeGamesList from './gamesList';

initializeChat(
  document.querySelector('input.chat-message'),
  document.querySelector('div.chat-display'),
  'lobby'
);

initializeGamesList(document.querySelector('div.game-list'));

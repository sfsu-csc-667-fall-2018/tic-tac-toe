/* eslint-env browser */
import api from '../api';
import socket from '../messaging';

import chatElementTemplate from '../templates/chatEntry.pug';

const initializeSockets = (roomIdentifier, chatDisplayElement) => {
  socket.on(`chat:${roomIdentifier}`, message => {
    // eslint-disable-next-line no-param-reassign
    chatDisplayElement.innerHTML = `
      ${chatDisplayElement.innerHTML}
      ${chatElementTemplate(message)}
    `;
  });
};

const chatInputHandler = roomIdentifier => event => {
  const { target, keyCode } = event;

  if (keyCode === 13) {
    api
      .sendChat(roomIdentifier, target.value)
      .then(_ => {
        target.value = '';
      })
      .catch(_ => {
        // eslint-disable-next-line no-alert
        alert('Failed to send message.');
      });
  }
};

const initializeChat = (
  chatInputElement,
  chatDisplayElement,
  roomIdentifier
) => {
  chatInputElement.addEventListener(
    'keydown',
    chatInputHandler(roomIdentifier)
  );

  initializeSockets(roomIdentifier, chatDisplayElement);
};

export default initializeChat;

/* eslint-env browser */

import api from '../api';
import socket from '../messaging';

const chatElement = (text, className) => {
  const element = document.createElement('div');

  element.classList.add(className);
  element.innerText = text;

  return element;
};

const initializeSockets = (roomIdentifier, chatDisplayElement) => {
  socket.on(`chat:${roomIdentifier}`, ({ username, message }) => {
    chatDisplayElement.appendChild(chatElement(username, 'username'));
    chatDisplayElement.appendChild(chatElement(message, 'message'));
  });
};

const chatInputHandler = event => {
  const { target, keyCode } = event;

  if (keyCode === 13) {
    api
      .sendLobbyChat(target.value)
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
  chatInputElement.addEventListener('keydown', chatInputHandler);

  initializeSockets(roomIdentifier, chatDisplayElement);
};

export default initializeChat;

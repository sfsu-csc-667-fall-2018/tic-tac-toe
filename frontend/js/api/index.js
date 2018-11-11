/* eslint-env browser */

const checkStatus = response => {
  if (response.ok) {
    return response;
  }
  return Promise.reject(new Error(`Response status was ${response.status}`));
};

const requestConfiguration = (body = {}, method) => {
  const config = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (Object.keys(body).length > 0) {
    config.body = JSON.stringify(body);
  }

  return config;
};

const request = (endpoint, body, method = 'post') =>
  fetch(endpoint, requestConfiguration(body, method)).then(checkStatus);

const jsonify = response => response.json();

export default {
  sendLobbyChat: message => request('/api/chat/lobby', { message }),
  getGamesList: () => request('/api/games', {}, 'get').then(jsonify)
};

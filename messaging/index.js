const io = require('socket.io')();
const sessionMiddleware = require('../config/session');

const init = server => {
  io.use(({ request }, next) => {
    sessionMiddleware(request, request.res, next);
  });

  io.attach(server);
};

const userSockets = {};

io.on('connection', socket => {
  try {
    const { user: userId } = socket.request.session.passport;

    userSockets[userId] = socket;

    socket.on('disconnect', () => {
      delete userSockets[userId];
    });
  } catch (_) {
    // eslint-disable-next-line no-console
    console.log('Failed to set up socket (probably missing auth)');
  }
});

module.exports = { init, io, userSockets };

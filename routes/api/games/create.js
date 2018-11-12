const moment = require('moment');

const { Game } = require('../../../db');
const { io } = require('../../../messaging');

const create = (request, response) => {
  const { id: userId } = request.user;

  Game.create(userId)
    .then(result => {
      // TODO there's a bug here where if I'm an owner of a game, I won't see that in
      //   another tab that I might have opened (since owner can't be calculated for recipient)
      io.emit('game:created', {
        ...result,
        timestamp: moment(result.createdAt).format('HH:mm:ss')
      });

      response.redirect(`/games/${result.id}`);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      response.redirect('/lobby');
    });
};

module.exports = create;

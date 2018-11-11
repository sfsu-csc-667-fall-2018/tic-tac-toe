const path = require('path');

module.exports = {
  entry: {
    'js/lobby': './frontend/js/lobby.js',
    'js/game': './frontend/js/game.js'
  },
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: '[name].js',
  },
  mode: process.env.NODE_ENV || 'development',
};

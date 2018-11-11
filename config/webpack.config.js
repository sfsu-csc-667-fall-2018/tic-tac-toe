const path = require('path');

module.exports = {
  entry: {
    'js/lobby': './frontend/js/lobby.js',
    'js/game': './frontend/js/game.js',
    'css/index': './frontend/css/index.scss'
  },
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    publicPath: '/public',
    filename: '[name].js'
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              context: './',
              outputPath: '/css/',
              publicPath: '/css'
            }
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      }
    ]
  }
};

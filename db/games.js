const gameInit = db => ({
  openGames: () => db.any('SELECT * FROM games')
});

module.exports = gameInit;

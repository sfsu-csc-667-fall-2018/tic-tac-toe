module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('game_users', {
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      turn_order: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      current_turn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }),
  down: queryInterface => queryInterface.dropTable('game_users')
};

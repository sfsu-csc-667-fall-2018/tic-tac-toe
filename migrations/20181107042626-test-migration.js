module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('test_table', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false
      },
      testString: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }),

  down: queryInterface => queryInterface.dropTable('test_table')
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      tconst: {
        type: Sequelize.STRING(20),
        primaryKey: true,
      },
      titletype: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      primaryTitle: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: 0,
      },
      runtimeMinutes: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      genres: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movies');
  },
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
      tconst: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        references: { model: 'movies', key: 'tconst' },
      },
      averageRating: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      numVotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movies');
  },
};

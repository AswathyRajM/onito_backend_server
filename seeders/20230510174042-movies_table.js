const fs = require('fs');
const csv = require('csv-parser');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream('./data/movies.csv')
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', async () => {
          queryInterface
            .bulkInsert('movies', results, {})
            .then(() => {
              resolve();
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('movies', null, {});
  },
};

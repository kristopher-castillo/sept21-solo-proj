'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Notebooks', [{
        title: 'Test Notebook Title',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete("Notebooks", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
      });
    
  }
};

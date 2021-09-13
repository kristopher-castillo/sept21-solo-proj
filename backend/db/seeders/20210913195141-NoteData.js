'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Notes', [{
        title: "Test Note Title",
        content: "Test Content, Test Content!",
        userId: 1,
        notebookId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete("Notes", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
      });
    
  }
};

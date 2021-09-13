'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notebookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.User, { foreignKey: 'userId' });
    
  };
  return Note;
};
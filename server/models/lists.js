'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.lists.belongsTo(models.users, {foreignKey: 'userID'})
      models.lists.hasMany(models.cards, {foreignKey: 'listID'})
    }
  }
  lists.init({
    listname: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lists',
  });
  return lists;
};
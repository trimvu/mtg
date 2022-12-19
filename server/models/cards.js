'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.cards.belongsTo(models.lists, {foreignKey: 'listID'})
    }
  }
  cards.init({
    cardName: DataTypes.STRING,
    addedPrice: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    currentPrice: DataTypes.FLOAT,
    listID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cards',
  });
  return cards;
};
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Annonce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User',
      })
    }
  }
  Annonce.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    filepath: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Annonce',
  });
  return Annonce;
};
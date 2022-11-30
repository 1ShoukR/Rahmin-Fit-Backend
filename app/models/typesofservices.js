'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypesOfServices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TypesOfServices.init({
    OneOnOneVirtualTraining: DataTypes.STRING,
    InPersonTraining: DataTypes.STRING,
    CustomBuiltTrainingPrograms: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypesOfServices',
  });
  return TypesOfServices;
};
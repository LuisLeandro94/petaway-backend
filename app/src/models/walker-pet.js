"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WalkerPet extends Model {
    static associate(models) {
      
    }
  }
  WalkerPet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      walkerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "walker_pets",
    }
  );
  return WalkerPet;
};

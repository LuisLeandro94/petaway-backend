"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Walker extends Model {
    static associate(models) {
      // Walker.belongsToMany(models.Pet, {
      //   through: "walker_pets",
      //   as: "pets",
      //   foreignKey: "walkerId",
      // });
      // Walker.belongsToMany(models.Service, {
      //   through: "walker_services",
      //   as: "services",
      //   foreignKey: "walkerId",
      // });
      // Walker.belongsTo(models.User, {
      //   foreignKey: "userId",
      //   as: "user",
      // });
    }
  }
  Walker.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "walkers",
    }
  );
  return Walker;
};



"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // Service.belongsToMany(models.Walker, {
      //   through: "walker_services",
      //   as: "walkers",
      //   foreignKey: "serviceId",
      // });
    }
  }
  Service.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "services",
    }
  );
  return Service;
};

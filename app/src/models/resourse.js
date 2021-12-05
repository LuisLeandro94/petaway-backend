

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Resourse extends Model {
    static associate(models) {
      // Service.belongsToMany(models.Walker, {
      //   through: "walker_services",
      //   as: "walkers",
      //   foreignKey: "serviceId",
      // });
    }
  }
  Resourse.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "resourses",
    }
  );
  return Resourse;
};

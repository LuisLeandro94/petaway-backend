"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // Event.hasOne(models.EventStatus, {
      //   foreignKey: "eventId",
      //   as: "Status",
      // });
      // Event.hasOne(models.User, {
      //   foreignKey: "userId",
      //   as: "user",
      // });
      // Event.hasOne(models.Walker, {
      //   foreignKey: "walkerId",
      //   as: "walker",
      // });
      // Event.hasOne(models.Service, {
      //   foreignKey: "serviceId",
      //   as: "service",
      // });
    }
  }
  Event.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      walkerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      petId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "events",
    }
  );
  return Event;
};

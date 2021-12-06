const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EventStatus extends Model {
    static associate(models) {

    }
  }
  EventStatus.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'event_status',
    },
  );
  return EventStatus;
};

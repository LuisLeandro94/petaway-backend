module.exports = (sequelize, DataTypes) => {
  const WalkerService = sequelize.define("walker_services", {
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
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return WalkerService;
};

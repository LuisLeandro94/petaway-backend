module.exports = (sequelize, DataTypes) => {
  const WalkerResourse = sequelize.define('walker_resourses', {
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
    resourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return WalkerResourse;
};

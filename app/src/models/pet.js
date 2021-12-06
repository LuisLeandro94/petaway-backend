const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      // Pet.belongsToMany(models.Walker, {
      //   through: "walker_pets",
      //   as: "walkers",
      //   foreignKey: "petId",
      // });
    }
  }
  Pet.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'pets',
    },
  );
  return Pet;
};

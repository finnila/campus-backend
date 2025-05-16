const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Campus extends Model {}

Campus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://via.placeholder.com/400x300",
    },
  },
  {
    sequelize,
    modelName: "campus",
  }
);

module.exports = Campus;

const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://via.placeholder.com/150",
    },
    gpa: {
      type: DataTypes.DECIMAL(3, 2),
      validate: {
        min: 0.0,
        max: 4.0,
      },
    },
    campusId: {
      type: DataTypes.INTEGER,
      references: {
        model: "campuses",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "student",
  }
);

module.exports = Student;

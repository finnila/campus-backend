const { sequelize } = require("../db");
const Campus = require("./Campus");
const Student = require("./Student");

// Associations
Campus.hasMany(Student);
Student.belongsTo(Campus);

module.exports = {
  sequelize,
  Campus,
  Student,
};

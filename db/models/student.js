const Sequelize = require("sequelize");
const db = require("./_db");

const Students = db.define("students", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: { isEmail: true }
  },
  gpa: {
    type: Sequelize.FLOAT,
    defaultValue: 0.00
  }
});

module.exports = Students;
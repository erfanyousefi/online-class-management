"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      this.belongsTo(models.Enrollment, {
        foreignKey: "enrollmentId",
        as: "enrollment",
      });
      this.belongsTo(models.Session, {foreignKey: "sessionId", as: "session"});
    }
  }
  Attendance.init(
    {
      enrollmentId: {type: DataTypes.INTEGER, allowNull: false},
      sessionId: {type: DataTypes.INTEGER, allowNull: false},
      present: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    },
    {sequelize, modelName: "attendance", tableName: "attendances"}
  );
  return Attendance;
};

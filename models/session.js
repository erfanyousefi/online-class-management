"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      this.belongsTo(models.Course, {foreignKey: "courseId", as: "course"});

      // هر جلسه می‌تواند حضور و غیاب داشته باشد
      this.hasMany(models.Attendance, {
        foreignKey: "sessionId",
        as: "attendances",
      });
    }
  }
  Session.init(
    {
      courseId: {type: DataTypes.INTEGER, allowNull: false},
      date: {type: DataTypes.DATE, allowNull: false},
    },
    {sequelize, modelName: "session", tableName: "sessions"}
  );
  return Session;
};

"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      // هر Enrollment متعلق به یک دانشجو و یک دوره است
      this.belongsTo(models.User, {foreignKey: "userId", as: "student"});
      this.belongsTo(models.Course, {foreignKey: "courseId", as: "course"});

      // حضور و غیاب‌های این دانشجو در جلسات مختلف این کلاس
      this.hasMany(models.Attendance, {
        foreignKey: "enrollmentId",
        as: "attendances",
      });
    }
  }
  Enrollment.init(
    {
      userId: {type: DataTypes.INTEGER, allowNull: false},
      courseId: {type: DataTypes.INTEGER, allowNull: false},
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {sequelize, modelName: "enrollment", tableName: "enrollments"}
  );
  return Enrollment;
};

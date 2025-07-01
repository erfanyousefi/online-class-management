"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // هر دوره متعلق به یک مدرس است
      this.belongsTo(models.User, {foreignKey: "teacherId", as: "teacher"});

      // هر دوره چند جلسه دارد
      this.hasMany(models.Session, {foreignKey: "courseId", as: "sessions"});

      // دانشجویان ثبت‌نام شده در دوره
      this.hasMany(models.Enrollment, {
        foreignKey: "courseId",
        as: "enrollments",
      });

      // پرداخت‌های مربوط به این دوره
      this.hasMany(models.Payment, {foreignKey: "courseId", as: "payments"});
    }
  }
  Course.init(
    {
      title: {type: DataTypes.STRING, allowNull: false},
      description: {type: DataTypes.TEXT, allowNull: true},
      teacherId: {type: DataTypes.INTEGER, allowNull: false},
    },
    {
      sequelize,
      modelName: "course",
      tableName: "courses",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return Course;
};

"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // یک استاد چندین Course ایجاد می‌کند:
      this.hasMany(models.Course, {foreignKey: "teacherId", as: "courses"});

      // هر دانشجو چندین Enrollment دارد:
      this.hasMany(models.Enrollment, {
        foreignKey: "userId",
        as: "enrollments",
      });

      // پرداخت‌ها
      this.hasMany(models.Payment, {foreignKey: "userId", as: "payments"});

      // شما می‌توانید Associationهای دیگر هم در مدل‌های دیگر اضافه کنید
    }
  }
  User.init(
    {
      name: {type: DataTypes.STRING, allowNull: false},
      email: {type: DataTypes.STRING, allowNull: false, unique: true},
      role: {
        type: DataTypes.ENUM("student", "teacher", "admin"),
        allowNull: false,
      },
    },
    {sequelize, modelName: "user", tableName: "users"}
  );
  return User;
};

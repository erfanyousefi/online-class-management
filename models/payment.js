"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      // هر پرداخت متعلق به یک کاربر و یک دوره است
      this.belongsTo(models.User, {foreignKey: "userId", as: "user"});
      this.belongsTo(models.Course, {foreignKey: "courseId", as: "course"});
    }
  }
  Payment.init(
    {
      userId: {type: DataTypes.INTEGER, allowNull: false},
      courseId: {type: DataTypes.INTEGER, allowNull: false},
      amount: {type: DataTypes.INTEGER, allowNull: false},
      status: {
        type: DataTypes.ENUM("pending", "paid", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {sequelize, modelName: "payment", tableName: "payments"}
  );
  return Payment;
};

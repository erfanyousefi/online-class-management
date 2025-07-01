"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // برای هر Enrollment یک پرداخت
    const [enrollments] = await queryInterface.sequelize.query(
      `SELECT id, userId, courseId FROM enrollments;`
    );

    const payments = enrollments.map((enr) => ({
      userId: enr.userId,
      courseId: enr.courseId,
      amount: 100, // فرض مبلغ ثابت
      status: "paid",
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("payments", payments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("payments", null, {});
  },
};

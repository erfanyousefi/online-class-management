"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // خواندن همه Enrollment و Session
    const [enrollments] = await queryInterface.sequelize.query(
      `SELECT id, courseId FROM enrollments;`
    );
    const [sessions] = await queryInterface.sequelize.query(
      `SELECT id, courseId FROM sessions;`
    );

    const attendances = [];
    enrollments.forEach((enr) => {
      sessions
        .filter((s) => s.courseId === enr.courseId)
        .forEach((s) => {
          attendances.push({
            enrollmentId: enr.id,
            sessionId: s.id,
            present: Math.random() > 0.3, // حدود 70% حضور
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
    });
    await queryInterface.bulkInsert("attendances", attendances, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("attendances", null, {});
  },
};

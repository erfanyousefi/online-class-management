"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const courses = await queryInterface.sequelize.query(
      `SELECT id from courses;`
    );
    const courseRows = courses[0];

    const sessions = [];
    courseRows.forEach((course) => {
      for (let i = 1; i <= 3; i++) {
        sessions.push({
          courseId: course.id,
          date: new Date(2025, 5, i * 2), // مثال تاریخ‌ها
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });
    await queryInterface.bulkInsert("sessions", sessions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sessions", null, {});
  },
};

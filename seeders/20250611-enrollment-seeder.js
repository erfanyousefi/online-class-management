"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // فرض: userId های 3،4،5 دانشجو هستند و courseId های 1،2،3
    const enrollments = [];
    [3, 4, 5].forEach((userId) => {
      [1, 2, 3].forEach((courseId) => {
        enrollments.push({
          userId,
          courseId,
          status: "accepted",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });
    await queryInterface.bulkInsert("enrollments", enrollments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("enrollments", null, {});
  },
};

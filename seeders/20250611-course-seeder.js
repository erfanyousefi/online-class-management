"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // فرض می‌کنیم teacherId=1 و 2 وجود دارد
    await queryInterface.bulkInsert(
      "Courses",
      [
        {
          title: "Node.js Advanced",
          description: "Deep dive into Node.js",
          teacherId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Sequelize ORM",
          description: "Master Sequelize associations and queries",
          teacherId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Database Design",
          description: "Relational DB modeling",
          teacherId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("courses", null, {});
  },
};

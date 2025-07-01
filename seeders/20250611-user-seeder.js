"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Alice Teacher",
          email: "alice@uni.edu",
          role: "teacher",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bob Teacher",
          email: "bob@uni.edu",
          role: "teacher",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Charlie Student",
          email: "charlie@student.edu",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Diana Student",
          email: "diana@student.edu",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Eve Student",
          email: "eve@student.edu",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Admin User",
          email: "admin@uni.edu",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};

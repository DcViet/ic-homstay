"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      { name: "Sống", },
      { name: "Đi", },
      { name: "Thở", },
      { name: "Thấy", },
      { name: "Yêu", },
    ];
    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("Categories", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

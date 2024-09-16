"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        name: "diam nam",
        imagePath: "/img/product-9.png",
      },
      {
        name: "id ornare",
        imagePath: "/img/product-4.png",
      },
      {
        name: "morbi vestibulum",
        imagePath: "/img/product-3.png",
      },
    ];

    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("Images", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE "Blogs" RESTART IDENTITY CASCADE;');

  },
};

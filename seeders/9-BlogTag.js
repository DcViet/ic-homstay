"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let items = [
      {
        blogId: 1,
        tagId: 1,
      },
      {
        blogId: 1,
        tagId: 2,
      },
      
    ];
    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("BlogTag", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE "Blogs" RESTART IDENTITY CASCADE;');
  },
};
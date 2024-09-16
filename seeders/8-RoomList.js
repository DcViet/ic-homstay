"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        roomName: "Phòng Langbiang",
        roomTitle: "Không gian 1",
        roomSummary: "View 1",
        imagePath: "images/hero-slider-1.jpg",
        imagePlus: "images/gal_1.jpg",
        imageAlt: "altimg1",
        roomPrice: "990000",
      },
      {
        roomName: "Phòng Clara",
        roomTitle: "Không gian 2",
        roomSummary: "View 2",
        imagePath: "images/hero-slider-2.jpg",
        imagePlus: "images/gal_2.jpg",
        imageAlt: "altimg2",
        roomPrice: "990000",
      },
      {
        roomName: "Phòng Dankia",
        roomTitle: "Không gian 3",
        roomSummary: "View 3",
        imagePath: "images/hero-slider-3.jpg",
        imagePlus: "images/gal_3.jpg",
        imageAlt: "altimg3",
        roomPrice: "990000",
      },
      {
        roomName: "Phòng Lạc Dương",
        roomTitle: "Không gian 4",
        roomSummary: "View 4",
        imagePath: "images/hero-slider-4.jpg",
        imagePlus: "images/gal_4.jpg",
        imageAlt: "altimg4",
        roomPrice: "990000",
      },
      {
        roomName: "Phòng Tà Nung",
        roomTitle: "Không gian 5",
        roomSummary: "View 5",
        imagePath: "images/hero-slider-5.jpg",
        imagePlus: "images/gal_5.jpg",
        imageAlt: "altimg5",
        roomPrice: "990000",
      },
    ];
    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("RoomLists", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE "Blogs" RESTART IDENTITY CASCADE;');

  },
};

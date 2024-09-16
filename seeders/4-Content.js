"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [
      {
        title: "Tạm Gác Lo Toan, Tận Hưởng Chút An Yên",
        subject:
          "Mỗi phòng tại homestay đều mang phong cách giản dị, gần gũi nhưng không kém phần ấm cúng. Ở Tiliz sự thoải mái đến từ những điều đơn giản nhất.",
      },
      {
        title: "Không gian homestay",
        subject: "",
      },
      {
        title:
          "Thư Giãn Cuối Tuần Tại Tiliz Homestay – Những Điều Nhỏ Bé Mà Dễ Thương",
        subject:
          "Không cần phải đi xa, chỉ cần một chút thời gian và một nơi thật yên bình, bạn đã có thể tận hưởng những phút giây thư giãn đúng nghĩa.",
      },
      {
        title: "Tiliz Homestay - Blog",
        subject:
          "Không phô trương, không hào nhoáng, chỉ là một nơi nghỉ dưỡng nhẹ nhàng, chân thật và ấm cúng.",
      },
      {
        title: "Tiliz Homestay",
        subject:
          "Nơi đây, bạn có thể thoải mái thả lỏng, tạm quên đi những bộn bề của cuộc sống. Hãy đến và tận hưởng những giây phút thư giãn bình yên, không cần cầu kỳ, chỉ cần là chính bạn.",
      },
    ];

    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("Contents", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE "Blogs" RESTART IDENTITY CASCADE;');

  },
};

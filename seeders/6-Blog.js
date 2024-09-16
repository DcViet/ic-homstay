"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let items = [
      {
        title:
          "Thư Giãn Cuối Tuần Tại Tiliz Homestay – Những Điều Nhỏ Bé Mà Dễ Thương",
        description: `<p>
                        Cuối tuần luôn là khoảng thời gian mà ai cũng mong đợi để có thể
                        nghỉ ngơi, thư giãn sau một tuần làm việc căng thẳng. Nếu bạn
                        đang tìm kiếm một địa điểm để tận hưởng không khí trong lành và
                        thoát khỏi nhịp sống hối hả của thành phố, Tiliz Homestay chính
                        là một lựa chọn lý tưởng. Với sự kết hợp giữa không gian ấm
                        cúng, thiết kế tinh tế và những trải nghiệm đầy thú vị, Tiliz
                        Homestay sẽ mang đến cho bạn một kỳ nghỉ cuối tuần đầy ý nghĩa
                        với những điều nhỏ bé mà dễ thương.
                    </p>
                    <p>
                        Nằm ẩn mình giữa thiên nhiên xanh mát, Tiliz Homestay không chỉ
                        đơn thuần là một nơi nghỉ dưỡng mà còn là một không gian để bạn
                        tìm lại sự yên bình và cân bằng trong cuộc sống. Homestay tọa
                        lạc tại một vị trí lý tưởng, gần gũi với thiên nhiên nhưng vẫn
                        tiện lợi để di chuyển từ trung tâm thành phố. Tiliz nổi bật với
                        phong cách thiết kế vừa hiện đại, vừa mang những nét cổ điển,
                        tạo nên một không gian ấm áp, thân thiện như chính ngôi nhà của
                        bạn.
                    </p>`,
        imagePath: "/img/blog/blog-1.jpg",
        imageAlt: "image-alt1",
        summary:
          "Cuối tuần luôn là khoảng thời gian mà ai cũng mong đợi để có thể nghỉ ngơi, thư giãn sau một tuần làm việc căng thẳng.",
        categoryId: 1,
        authorId: 1,
      },
    ];
    items.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("Blogs", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE "Blogs" RESTART IDENTITY CASCADE;');

  },
};

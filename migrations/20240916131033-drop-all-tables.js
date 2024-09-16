"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Đọc các mô hình từ thư mục models
    const models = require('../models'); // Thay đổi đường dẫn tùy theo cấu trúc dự án của bạn

    // Lấy danh sách tất cả các bảng
    const tables = await queryInterface.showAllTables();

    // Xóa tất cả các bảng
    for (const tableName of tables) {
      await queryInterface.dropTable(tableName);
    }
  },

  async down(queryInterface, Sequelize) {
    // Tùy thuộc vào yêu cầu của bạn, bạn có thể thêm logic để tái tạo các bảng ở đây
  },
};

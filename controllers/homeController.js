"use strict";

const controller = {};
const models = require("../models");

controller.showHomepage = async (req, res) => {
  // Lấy 5 bản ghi từ bảng Content
  const getContents = await models.Content.findAll({
    limit: 5,
  });

  // Lấy 5 bản ghi từ bảng RoomList với các thuộc tính cụ thể
  const getRoomList = await models.RoomList.findAll({
    attributes: ["roomName", "roomTitle", "imagePath", "imageAlt", "roomPrice"],
    limit: 4,
  });

  // Tạo đối tượng dữ liệu để truyền vào view
  const contentsData = {
    content1: getContents[0] || null,
    content2: getContents[1] || null,
    content3: getContents[2] || null,
    content4: getContents[3] || null,
    content5: getContents[4] || null,
    roomList: getRoomList,
  };

  // Render trang với các nội dung được truyền vào
  res.render("home", contentsData);
  // Kiểm tra dữ liệu lấy được từ cơ sở dữ liệu
  console.log(getContents);
};

module.exports = controller;

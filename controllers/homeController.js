"use strict";

const controller = {};
const models = require("../models");

controller.showHomepage = async (req, res) => {
  const getRoomLists = await models.RoomList.findAll({
    attributes: ["roomName", "roomTitle", "imagePath", "imageAlt", "roomPrice"],
    limit: 4,
  });

  // Fetch content data by ID
  const contentIds = [1, 2, 3, 4, 5];
  const contentPromises = contentIds.map((id) => models.Content.findByPk(id));
  const getContents = await Promise.all(contentPromises);

  // Prepare data for view
  const contentsData = contentIds.reduce((acc, id, index) => {
    acc[`content${index + 1}`] = getContents[index]
      ? getContents[index].dataValues
      : null;
    return acc;
  }, {});

  console.log("Contents Data:", contentsData);

  // res.locals.getRoomLists = getRoomLists;
  res.locals.getRoomLists = getRoomLists.map((room) => room.dataValues);
  res.locals.contentsData = contentsData;

  res.render("home");
};

module.exports = controller;

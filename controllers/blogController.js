"use strict";

const controller = {};
const models = require("../models");

const sequelize = require("sequelize");
const Op = sequelize.Op;

controller.init = async (req, res, next) => {
  let categories = await models.Category.findAll({
    include: [{ model: models.Blog }],
  });
  res.locals.categories = categories;

  //lay danh sach tags dua ra view
  let tags = await models.Tag.findAll();
  res.locals.tags = tags;

  next();
};

controller.viewList = async (req, res) => {
  // lay danh sach categories dua ra view

  let categoryId = isNaN(req.query.category) ? 0 : parseInt(req.query.category);
  let tagId = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag);
  let keyword = req.query.keyword ? req.query.keyword.trim() : "";
  // console.log(categoryId);
  
  // lay danh sach blog dua ra view
  let options = {
    attributes: ["id", "title", "imagePath", "summary", "createdAt"],
    include: [{ model: models.Comment }],
    where: {},
  };

  if (categoryId > 0) {
    options.where.categoryId = categoryId;
  }
  if (tagId > 0) {
    options.include.push({ models: models.Tag, where: { id: tagId } });
  }

  if (keyword != "") {
    options.where.title = { [Op.ilike]: `%${keyword}%` };
  }

  let blogs = await models.Blog.findAll(options);

  // [1,2,3,4,5,6]
  // page = 1 => offset 0[1,2]
  // page = 2 => [3,4]
  let limit = 2;
  let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  let offset = (page - 1) * limit;
  let selectedBlogs = blogs.slice(offset, offset + limit);

  let pagination = {
    page,
    limit,
    totalRows: blogs.length,
  };

  res.locals.pagination = pagination;
  res.locals.blogs = selectedBlogs;
  res.render("index");
};

controller.viewDetails = async (req, res) => {
  //lay thong tin blogs dua ra view
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  let blog = await models.Blog.findOne({
    where: { id },
    include: [
      { model: models.User },
      { model: models.Category },
      { model: models.Tag },
    ],
  });
  res.locals.blog = blog;
  res.render("blog");
};

module.exports = controller;

"use strict";

const controller = {};
// const models = require("../models/sqlModels");

controller.showHomepage = async (req, res) => { 
    const recentContents = await models.Content.findAll ({
        attributes: ['title', 'subject'],
        order: [['createdAt', 'DESC']],
        limit: 10
    });
    res.local.recentContents = recentContents;

    // res.send('api list!');
}

module.exports = controller;

'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeController');

console.log('Controller:', controller);
router.get('/', controller.showHomepage);

// router.get('/:page', controller.showPage);

module.exports = router;
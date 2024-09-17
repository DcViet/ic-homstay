'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/blogController');

router.get('/', controller.viewDetails);

// router.get('/:page', controller.showPage);

module.exports = router;
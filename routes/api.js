'use strict';

var express = require('express');
var router = express.Router();

router.use('/questions', require('./questions'));

module.exports = router;

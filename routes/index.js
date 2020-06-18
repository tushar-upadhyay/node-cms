var express = require('express');
var router = express.Router();
var temp = require('./temp');
// const posts = require('../database/posts');
// /* GET home page. */
router.get('/', function(req, res, next) {
  res.send(temp)
});

module.exports = router;

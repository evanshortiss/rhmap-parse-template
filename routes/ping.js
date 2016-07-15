'use strict';

var express = require('express');

var route = module.exports = express.Router();

route.all('/', function (req, res) {
  res.end('pong');
});

'use strict';

var log = require('fh-bunyan').getLogger(__filename);

log.info('main.js was loaded by parse-server!');

// Define a ping route on our Parse server
Parse.Cloud.define('ping', function (request, response) {
  log.debug('called parse ping endpoint');
  response.success('parse pong');
});

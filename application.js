'use strict';

var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');
var path = require('path');
var parse = require('parse-server');
var env = require('env-var');
var log = require('fh-bunyan').getLogger(__filename);

var ParseServer = parse.ParseServer;

var app = express();

// Enable CORS for all requests
app.use(cors());

// Specify the connection string for your mongodb database
// and the location to your Parse cloud code
var api = new ParseServer({
  databaseURI: env('FH_MONGODB_CONN_URL', 'mongodb://127.0.0.1:27017/FH_LOCAL'),
  cloud: path.join(__dirname, './main.js'),
  appId: env('FH_WIDGET', 'local_app_id'),
  javascriptKey: 'local_dev_key',
  masterKey: env('PARSE_MASTER_KEY', 'local_dev_key'),
  serverURL: 'http://localhost:' + port + '/parse'
});

// Define a ping route
Parse.Cloud.define('ping', function (request, response) {
  log.debug('called parse ping endpoint');
  response.success('parse pong');
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys([]));
app.use('/mbaas', mbaasExpress.mbaas);

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

// Serve some static fies
app.use('/app', express.static(__dirname + '/public'));

// Use standard express routing
app.use('/custom-route/ping', require('./routes/ping'));

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  log.info('App started on port: %s', port);
});


var express  = require('express');
var path     = require('path');
var merge    = require('merge-recursive');

// ------------------------------------------------------------------

var config = { };
var BASEDIR = path.join(__dirname, '../../..');

var conf = exports.config = function(key) {
	return key ? config[key] : config;
};

conf.base = function(basedir) {
	BASEDIR = basedir;
};

conf.require = function(filepath) {
	filepath = path.resolve(BASEDIR, filepath);
	merge.recursive(config, require(filepath));
};

// ------------------------------------------------------------------

exports.start = function() {
	var app   = express();
	var http  = conf('http');

	app.configure(function() {
		if (http.trustProxy) {
			app.set('trust proxy', true);
		}

		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.methodOverride());

		if (http.enableCors) {
			app.use(function(req, res, next) {
				res.header('Access-Control-Allow-Origin', '*');
				res.header('Access-Control-Allow-Credentials', true);
				res.header('Access-Control-Allow-Methods', conf.cors.methods);
				res.header('Access-Control-Allow-Headers', conf.cors.headers);

				next();
			});
		}
		
		app.use(express.logger());
		app.use(app.router);
	});

	app.configure('development', function() {
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure('production', function() {
		app.use(express.errorHandler());
	});

	app.listen(http.address, http.port, function() {
		console.log('HTTP server listening at ' + http.address + ':' + http.port + '...');
	});
};

// ------------------------------------------------------------------

exports.initializeMongoose = function() {
	require('mongoose-models').init({
		
	})
};

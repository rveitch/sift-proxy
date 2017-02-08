'use strict';
var express = require('express');
var request = require('request');
var app = express();

var port = Number(process.env.PORT || 3000);
var config = require('./config');
var es_auth;

app.use('/', function(req, res, body) {
	// Short-circuit favicon requests for easier debugging and cleaner logging
	if (req.url != '/favicon.ico') {
		console.log(Date() + ': ' + req.method + ': ' +req.url);

		// Request method handling: exit if not GET, POST or OPTIONS
		if ( ! (req.method == 'GET' || req.method == 'POST' || req.method == 'OPTIONS') ) {
			errMethod = { error: req.method + " request method is not supported. Use GET, POST or OPTIONS." };
			console.log("ERROR: " + req.method + " request method is not supported.");
			res.write(JSON.stringify(errMethod));
			res.end();
			return;
		}

		// Define auth
		if (config.es_user && config.es_pass) {
			var es_auth = {
					user : (process.env.ELASTIC_USER || config.es_user),
					pass : (process.env.ELASTIC_PASS || config.es_pass)
			}
		}

		// Send the request
		req.pipe(request({
		    uri  : (process.env.ELASTIC_URL || config.es_host) + req.url,
		    auth : es_auth,
				headers: {
					'accept-encoding': 'none',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				},
		    rejectUnauthorized : false,
		}, function(err, res, body) {
				if (err !== null) {
					console.error(Date() + ' ' + err);
				}
		})).pipe(res);
	}
});

// Server Listen
app.listen(port, function () {
	console.log('App server is running on http://localhost:' + port);
	console.log('ES_Host: ' + (process.env.ELASTIC_URL || config.es_host));
});

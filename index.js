var express = require('express');
var request = require('request');
var app = express();

var port = Number(process.env.PORT || 3000);
var apiServerHost = (process.env.ELASTIC_URL || 'https://cb80282cbbc41f932c66:e1e81fcbe6@4425deab.qb0x.com:30816') //http://127.0.0.1:9200

app.use('/', function(req, res, body) {
	// short-circuit favicon requests for easier debugging
	if (req.url != '/favicon.ico') {
		console.log('req.method: ' + req.method);
		console.log('req.url: ' + req.url);

		// Request method handling: exit if not GET or POST
		if ( ! (req.method == 'GET' || req.method == 'POST') ) {
			errMethod = { error: req.method + " request method is not supported. Use GET or POST." };
			console.log("ERROR: " + req.method + " request method is not supported.");
			res.write(JSON.stringify(errMethod));
			res.end();
			return;
		}

		// send your request
	  var url = apiServerHost + req.url;
		req.pipe(request({
		    uri  : url,
		    auth : {
		        user : (process.env.ELASTIC_USER || 'cb80282cbbc41f932c66'),
		        pass : (process.env.ELASTIC_PASS || 'e1e81fcbe6')
		    },
				headers: {
					'accept-encoding': 'none',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
				},
		    rejectUnauthorized : false,
		}, function(err, res, body) {
				//console.log('REQUEST RESULTS:', err, res.statusCode, body`);
				//console.log('server encoded the data as: ' + (res.headers['content-encoding'] || 'identity'))
				//console.log("\n" + 'The decoded data is: ' + body)
		})).pipe(res);
	}
});

// Server Listen
app.listen(port, function () {
	console.log('App server is running on http://localhost:' + port);
	console.log('Heroku config variable - ELASTIC_URL: ' + process.env.ELASTIC_URL);
	console.log('apiServerHost: ' + apiServerHost);
});

var express = require('express');
var request = require('request');
var app = express();

var port = Number(process.env.PORT || 3000);
var apiServerHost = (process.env.ELASTIC_URL || 'http://127.0.0.1:9200/fccnn/_search');

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
		        user : '3590b9d403c87e0697b6',
		        pass : '8c2e5209a1'
		    },
				headers: {
					'accept-encoding': 'none'
				},
		    rejectUnauthorized : false,
		}, function(err, res, body) {
				//console.log('REQUEST RESULTS:', err, res.statusCode, body);
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

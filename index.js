var express = require('express');
var request = require('request');
require('request-debug')(request);
var bodyParser = require('body-parser');
var app = express();

var port = Number(process.env.PORT || 3000);
var apiServerHost = (process.env.ELASTIC_URL || 'https://3590b9d403c87e0697b6:8c2e5209a1@f08f4b1b.qb0x.com:30242') //http://127.0.0.1:9200

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// no-cors example: http://blog.javascripting.com/2015/01/17/dont-hassle-with-cors/
app.use('/', function(req, res, body) {
	// short-circuit favicon requests for easier debugging
	if (req.url != '/favicon.ico') {
		// send your request
	  var url = apiServerHost + req.url;
		console.log('req.url: ' + req.url);
		//req.pipe(request(url)).pipe(res);
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
				console.log("\n" + 'The decoded data is: ' + body)
		})).pipe(res);
	}
});


/*
if (!body) : filter the body field from the uri request
if (body) : filter body field from the soure fields
*/

///////////////////////////////////////////////////////////////////////////////

// Server Listen
app.listen(port, function () {
	console.log('App server is running on http://localhost:' + port);
	console.log('apiServerHost: ' + apiServerHost);
});

// Server frontpage
/*app.get('/', function (req, res) {
    res.send('Hello World');
});*/

var express 	= require("express");
var application_root = __dirname;
var app 	= express();
var router 	= express.Router();

app.use(function(req, res, done){
	console.log(req.protocol, req.method, req.url);
	done();
});
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.static(application_root + '/public'));
app.use(app.router);

app.listen(8000, function(){
	console.log('Listening on port: 8000');
});

require('./src/js/routes.js')(app);

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
    if (text === 'quit\n') {
        process.exit();
    }
});

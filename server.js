// set up ======================================================================
var http			= require('http');
var express			= require('express');
var app				= express();								// create our app w/ express
var port			= process.env.PORT || 8000;					// set the port
var swig            = require('swig');
var bodyParser		= require('body-parser');
var methodOverride	= require('method-override');

// Mongoose ====================================================================
require('./config/database');

// Express =====================================================================
app.use(express.static(__dirname + '/public'));					// set the static files location /public/img will be /img for users


app.use(bodyParser.urlencoded({'extended':'true'}));			// parse application/x-www-form-urlencoded
app.use(bodyParser.json());										// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Override for method DELETE & PUT in form
app.use(methodOverride('_method'));
	app.use(methodOverride(function(req, res){
	      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	        // look in urlencoded POST bodies and delete it
	        var method = req.body._method
	        delete req.body._method
	        return method
	      }
	}))

app.engine('html', swig.renderFile);
app.set('views', './app/views');
app.set('view engine', 'html');

// Serveur ====================================================================
var server = http.Server(app);

// Routes ======================================================================
require('./app/routes/')(app);

process.on('SIGINT', function() {
  console.log("\nStopping...");
  process.exit();
});

// listen (start app with node server.js) ======================================
server.listen(port);
console.log("App listening on port " + port);

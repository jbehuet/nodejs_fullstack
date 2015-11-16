// set up ======================================================================
var http			= require('http');
var express			= require('express');
var app				= express();								// create our app w/ express
var port			= process.env.PORT || 8000;					// set the port
var swig            = require('swig');

// Express =====================================================================
app.use(express.static(__dirname + '/public'));					// set the static files location /public/img will be /img for users

app.engine('html', swig.renderFile);
app.set('views', './app/views');
app.set('view engine', 'html');

// Serveur ====================================================================
var server = http.Server(app);

// Routes ======================================================================
require('./app/routes/statics')(app);

process.on('SIGINT', function() {
  console.log("Stopping...");
  process.exit();
});

// listen (start app with node server.js) ======================================
server.listen(port);
console.log("App listening on port " + port);

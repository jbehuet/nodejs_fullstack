// set up ======================================================================
var http			= require('http');
var port			= process.env.PORT || 8000;					// set the port
var url             = require('url');
var fs              = require('fs');

function app(req,res) {
    if(req.url=='/index.html' || req.url=='/') {
        fs.readFile('./views/index.html',function(err,data){
            res.end(data);
        });
    } else {
         fs.readFile('./views' + req.url + '.html',function(err,data){
             if (!err)
                 res.end(data);
        });
    }
}

// Serveur ====================================================================
var server = http.Server(app);
        
process.on('SIGINT', function() {
  console.log("Stopping...");
  process.exit();
});

// listen (start app with node server.js) ======================================
server.listen(port);
console.log("App listening on port " + port);
/* ----------------------------------------- *\
					STATICS
\* ----------------------------------------- */

module.exports 	= function(app) {

    app.get('/', function(req, res) {
        res.redirect('/todos');
    });
    
    app.get('/about', function(req, res) {
      res.render('about', { title: 'About' });
    });

};
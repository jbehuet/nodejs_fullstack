/* ------------------------------------------------------------------------- *\
	 							MODEL TODO
\* ------------------------------------------------------------------------- */

var mongoose = require('mongoose');


var todoSchema = new mongoose.Schema({
  description: String
});

var Todo = {
    
    model: mongoose.model('Todo', todoSchema),
    
    create: function(req, res) {
		Todo.model.create({
			description: req.body.description
		}, function(){
			res.redirect('/');
		})
	},

	findAll: function(req, res) {
		Todo.model.find(function (err, data) {
			res.render('index', {todos: data});
		});
	},

	update: function(req, res){
		Todo.model.findByIdAndUpdate(req.params.id, {
			description: req.body.description
		}, function(){
			res.redirect('/');
		})
	},

	delete: function(req, res){
		Todo.model.findByIdAndRemove(req.params.id, function(){
			res.redirect('/');
		})
	}

    
    
}

module.exports = Todo;


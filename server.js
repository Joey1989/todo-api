var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3001;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('to do api');
});

//GET /todos
app.get('/todos', function(req, res){
	res.json(todos);
	console.log('requested...');
});

//GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	// todos.forEach(function(todo){
 //        if(todoId === todo.id){
 //        	matchedTodo = todo;
 //        }
	// });
	if(matchedTodo){
        res.json(matchedTodo);
	}else{
		res.status(404).send();
	}
	// res.send('asking for todo with id of'+ matchedTodo);
});

//POST /todos
app.post('/todos', function(req, res){
	var body = _.pick(req.body, 'description', 'completed');
	
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length ===0){
		return res.status(404).send();
	}

	body.description = body.description.trim();
	body.id = todoNextId++;
	todos.push(body);
	res.json(body);
});

app.listen(PORT, function(){
	console.log('express listening to port'+ PORT);
});
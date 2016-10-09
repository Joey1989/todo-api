var express = require('express');
var app = express();
var PORT = process.env.PORT || 3001;
var todos = [{
	id: 1,
	description: 'meet someone for lunch',
	complete: false
},{
	id: 2,
	description: 'go to ranch',
	complete: false
}];

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
	var matchedTodo;
	todos.forEach(function(todo){
        if(todoId === todo.id){
        	matchedTodo = todo;
        }
	});
	if(matchedTodo){
        res.json(matchedTodo);
	}else{
		res.status(404).send();
	}
	res.send('asking for todo with id of'+ req.params.id);
});

app.listen(PORT, function(){
	console.log('express listening to port'+ PORT);
});
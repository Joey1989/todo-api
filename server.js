var express = require('express');
var app = express();
var PORT = process.env.PORT || 3001;

app.get('/', function(res, res){
    res.send('to do api');
});

app.listen(PORT, function(){
	console.log('express listening to port'+ PORT);
});
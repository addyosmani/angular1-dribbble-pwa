var express = require('express');

var app = new express(),
	port = process.env.PORT || 8080;

app.set('view engine', 'jade');
app.set('views', './app/views');
app.use(express.static('./app'));

require('./routes')(app);

app.listen(port, function() {
	console.log("Listening on port: " + port);
});
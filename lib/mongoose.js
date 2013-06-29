
var app       = require('./index');
var mongoose  = require('mongoose');

mongoose.connect(app.config('mongoose').url)

mongoose.connection.on('error', console.error.bind(console, 'Mongo Connection Error:'));

mongoose.connection.once('open', function() {
	// 
	// ...
	// 
});

module.exports = mongoose;

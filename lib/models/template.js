
var mongoose = require('../mongoose');

var templateSchema = mongoose.Schema({
	name: String,
	content: String  // This should be a handlebars template string
});

module.exports = mongoose.model('Template', templateSchema);

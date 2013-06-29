
var mongoose  = require('../mongoose');
var Template  = require('./template');
var ObjectId  = mongoose.Schema.Types.ObjectId;

var pageSchema = mongoose.Schema({
	uri: String,
	title: String,
	content: String,
	template: {type: ObjectId, ref: 'Template'}
});

module.exports = mongoose.model('Page', pageSchema);

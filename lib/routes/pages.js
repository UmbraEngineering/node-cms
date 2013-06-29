
var app = require('../app');

// 
// This is a catch all route because page urls are defined in the database and
// therefore are not known until runtime. We must test all requests (except those
// already matched such as admin routes) to check if they fit an existing page.
// 
app.use(function(req, res, next) {
	// Get the requested url and split it into segments
	var urlSegments = req.url.split('/');

	
});

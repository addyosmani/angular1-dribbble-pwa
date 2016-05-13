module.exports = function(app) {
	
	app.get('/', function(req, res, next) {
		res.render('shots');
	});
	
	app.get('/details', function(req, res, next) {
		res.render('details');
	});
	
	app.use(function(req, res, next) {
		res.status('404').render('error/404');
	});
	
}
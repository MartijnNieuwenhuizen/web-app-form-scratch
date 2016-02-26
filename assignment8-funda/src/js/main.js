(function() {
	'use strict';
	
	var routes = require('./routes/routes');
	var firstVisitToday = require('./modules/firstVisitToday');

	var app = {
		launcher: function() {

			routes.init();
			firstVisitToday.check();

		}
	}

	app.launcher();

})();
(function() {
	'use strict';
	
	// Init Modules
	var routes = require('./modules/routes');

	var app = {
		init: function() {

			// call the routes.init
			routes.init();

		}
	}

	// start the main app
	app.init();

})();
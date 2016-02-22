(function() {
	'use strict';
	
	var routes = require('./routes/routes');

	var app = {
		init: function() {

			routes.init();

		}
	}

	app.init();

})();
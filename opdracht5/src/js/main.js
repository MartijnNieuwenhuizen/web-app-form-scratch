// Add the iifi
(function() {
	'use strict';

	var app = {
		init: function() {

			// call the routes.init
			routes.init();

		}
	}

	var routes = {
		init: function() {

			// haschanged event listener
			window.addEventListener('hashchange', sections.toggle ,false);

		}
	}

	var sections = {
		toggle: function(route) {

			// Add the toggle function: show one / hide the others

		}
	}

	// start the main app
	app.init();

})();
// Add the iifi
(function() {
	'use strict';

	var main = document.querySelector('main');

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
			// also check the page on load
			window.addEventListener('load', sections.toggle ,false);
		}
	}

	var sections = {
		toggle: function() {

			// Get the hash of the current url after click
			var url = window.location.hash;

			// If the url has a hash
			if ( url ) {
				//NOTE: Got the templateing idea from Dylan Vens
				// Get the template that matches the url
				var matchingTemplate = document.querySelector(url);

				// If this templates exists
				if ( matchingTemplate ) {
	
					// Get the content from the matching template and use that content in the main html
					main.innerHTML = matchingTemplate.innerHTML;
				} else {

					// If the template doesn't exists: load the error template
					main.innerHTML = document.querySelector('#error').innerHTML;
				}
				
			} else {
				
				// If the url has no hash(so this is home) -> set the hash to start
				window.location.hash = '#home';
			} 
		}
	}
	
	// start the main app
	app.init();
})();

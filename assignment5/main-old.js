// Add the iifi
(function() {
	'use strict';

	function appLiteral() { // moet dit een object worden?

		var _this = this;
		var routes = new routesLiteral(); // Hoort dit zo???
		
		// The method, a function in a object
		_this.init = function() {

			// Call the routes.init();
			routes.init();

		}

	}

	function routesLiteral() {

		var _this = this;
		var sections = new sectionsLiteral();

		_this.init = function() {

			// Add the has change event listener
			window.addEventListener('hashchange', sections.toggle ,false);

		}

	}

	function sectionsLiteral() {

		var _this = this;
		_this.toggle = function(route) {

			// Code
			console.log("does this work???");
			// show section --> others = hide!

		}

	}

	// is dit te omslagtig?? -> JA!, voor later gebruiken
	var app = new appLiteral();
	app.init();

	// var routes = new routesLiteral(); // Hoort dit zo???
	// var sections = new sectionsLiteral();
	// var app = new appLiteral();
	// app.init();

})();
// 1 Functie = 1 Functionaliteit!

var htmlElements = require('../modules/htmlElements');	
var settings = require('../modules/settings');

var routes = {
	init: function() {

		routie({
			
			'': function() {
				window.location.hash = 'settings';
			},
			'settings': function() {
				settings.showForm();
			}

		});

	}
}

module.exports = routes;
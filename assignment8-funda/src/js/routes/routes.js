// 1 Functie = 1 Functionaliteit!

var htmlElements = require('../modules/htmlElements');	
var userSettings = require('../modules/userSettings');

var routes = {
	init: function() {

		routie({
			
			'': function() {
				window.location.hash = 'settings';
			},
			'settings': function() {
				userSettings.checkLocalStorage();
			}

		});

	}
}

module.exports = routes;
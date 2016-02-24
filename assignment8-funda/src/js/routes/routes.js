// 1 Functie = 1 Functionaliteit!

var htmlElements = require('../modules/htmlElements');	
var userSettings = require('../modules/userSettings');
var funda = require('../modules/funda');

var routes = {
	init: function() {

		routie({
			
			'': function() {
				window.location.hash = 'settings';
			},
			'settings': function() {
				userSettings.checkLocalStorage();
			},
			'droomhuis/:city': function(city) {
				funda.handleData(city);
			}

		});

	}
}

module.exports = routes;
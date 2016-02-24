// 1 Functie = 1 Functionaliteit!
var htmlElements = require('../modules/htmlElements');	
var userSettings = require('../modules/userSettings');
var funda = require('../modules/funda');
var dataFilter = require('../modules/dataFilter');

var routes = {
	init: function() {

		routie({
			
			'': function() {
				window.location.hash = 'settings';
			},
			'settings': function() {
				userSettings.checkLocalStorage();
			},
			'droomhuis/:city': function() {
				funda.returnData()
					.then(function(resolve) {

						dataFilter.devideHouses(resolve);
						
					});
			}

		});

	}
}

module.exports = routes;
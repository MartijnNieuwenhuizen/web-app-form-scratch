// 1 Functie = 1 Functionaliteit!
var htmlElements = require('../modules/htmlElements');	
var userSettings = require('../modules/userSettings');
var funda = require('../modules/funda');
var dataFilter = require('../modules/dataFilter');
var template = require('../view/template');

var routes = {
	init: function() {

		routie({
			
			'': function() {
				window.location.hash = 'settings';
			},
			'settings': function() {
				userSettings.checkLocalStorage();
			},
			'droomhuis-vandaag/:city': function() {
				funda.returnNewHouses()
					.then(function(data) {

						template.render(htmlElements.newHouses.innerHTML, data);

					});
			},
			'droomhuis/:city': function() {
				funda.returnAllHouses()
					.then(function(data) {

						template.render(htmlElements.houseList.innerHTML, data);

					});
			}

		});

	}
}

module.exports = routes;
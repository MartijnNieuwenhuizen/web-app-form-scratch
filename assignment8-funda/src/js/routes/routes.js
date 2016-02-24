// 1 Functie = 1 Functionaliteit!
var htmlElements = require('../modules/htmlElements');	
var userSettings = require('../modules/userSettings');
var funda = require('../modules/funda');
var dataFilter = require('../modules/dataFilter');
var template = require('../view/template');
var spinner = require('../modules/spinner');

var routes = {
	init: function() {

		routie({
			
			'': function() {
				spinner.start();
				window.location.hash = 'settings';
			},
			'settings': function() {
				spinner.start();
				userSettings.checkLocalStorage();
			},
			'droomhuis-vandaag/:city': function() {
				spinner.start();
				funda.returnNewHouses()
					.then(function(data) {

						template.render(htmlElements.newHouses.innerHTML, data);

					});
			},
			'droomhuis/:city': function() {
				spinner.start();
				funda.returnAllHouses()
					.then(function(data) {

						template.render(htmlElements.houseList.innerHTML, data);

					});
			}

		});

	}
}

module.exports = routes;
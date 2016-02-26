var htmlElements = require('../modules/htmlElements');	
var template = require('../view/template');
var assembleComponents = require('../modules/assembleComponents');

var routes = {
	init: function() {

		routie({
			
			'': function() {
				window.location.hash = '#thuis/city';
			},
			'settings': function() {
				assembleComponents.settings();
			},
			'thuis-vandaag/:city': function() {
				assembleComponents.newHouses();	
			},
			'thuis/:city': function() {
				assembleComponents.allHouses();		
			},
			'*': function() {
				assembleComponents.error();
			}	

		});

	}
}

module.exports = routes;
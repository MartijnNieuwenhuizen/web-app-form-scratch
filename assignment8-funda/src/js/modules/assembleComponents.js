var htmlElements = require('./htmlElements');	
var userSettings = require('./userSettings');
var funda = require('./funda');
var dataFilter = require('./dataFilter');
var template = require('../view/template');
var spinner = require('./spinner');
var pushMessage = require('./pushMessage');

assembleComponents = {
	allHouses: function() {

		spinner.start();
		funda.returnAllHouses()
			.then(function(data) {

				pushMessage.pushNewHouses(); // for development purposes

				template.render(htmlElements.houseList.innerHTML, data)
					.then(function() {
						htmlElements.main.classList.add("fade-in");
						setTimeout(function() { 
							htmlElements.main.classList.remove("fade-in");
						}, 1000);
					});

			});

	},
	newHouses: function() {

		spinner.start();
		funda.returnNewHouses()
			.then(function(data) {

				template.render(htmlElements.newHouses.innerHTML, data)
					.then(function() {
						htmlElements.main.classList.add("fade-in");
						setTimeout(function() { 
							htmlElements.main.classList.remove("fade-in");
						}, 1000);
					});

			});

	},
	settings: function() {

		spinner.start();
		userSettings.checkLocalStorage();

	},
	error: function() {

		var content = {
			title: "404",
			message: "Sorry page not found"
		}
		template.render(htmlElements.error.innerHTML, content);

	}
}

module.exports = assembleComponents;
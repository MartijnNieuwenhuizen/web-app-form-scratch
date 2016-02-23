var htmlElements = require('../modules/htmlElements');
var template = require('../view/template');
var localStorageMod = require('./local-storage');
var pushMessage = require('./pushMessage');

var userSettings = {
	// check if there is relevant data in local storage
	checkLocalStorage: function() {

		// check if localStorage had data
			// yes -> show and content: Verander + load template
			// no -> load template

		localStorageMod.get('userSettings')
			.then(function(resolve) {

				var content = {
					action: "Veranderen uw instellngen"
				}
				userSettings.showForm(content);
				userSettings.retreveSettings(resolve);

			})
			.catch(function() {

				var content = {
					action: "Sla uw instellingen op"
				}
				userSettings.showForm(content);

			})


	},
	// Call render function and get button
	showForm: function(content) {

		template.render(htmlElements.settingsForm.innerHTML, content) // ToDo: Animation to let the user see the content had changed
		.then(function() {

			var submitButton = document.querySelector('#submit-button');
			submitButton.addEventListener('click', userSettings.saveSettings, false);

		});
		
	},
	// Fill the form with the data from local Storage
	retreveSettings: function(localStorageSettings) {

		var setSettings = localStorageSettings;
		// ToDo: NOT ON THIS WAY!!!!!!!!
		document.querySelector('#city').value = setSettings.city;
		document.querySelector('#radius').value = setSettings.radius;
		document.querySelector('#min-price').value = setSettings.minPrice;
		document.querySelector('#max-price').value = setSettings.maxPrice;
		document.querySelector('#notification').checked = setSettings.notification;

	},
	// Put the data in local storage
	saveSettings: function() {

		settings = {
			// ToDo: NOT ON THIS WAY!!!!!!!!
			city: document.querySelector('#city').value,
			radius: document.querySelector('#radius').value,
			minPrice: document.querySelector('#min-price').value,
			maxPrice: document.querySelector('#max-price').value,
			notification: document.querySelector('#notification').checked
		};
		// if ( settings.city contains a 'spatie' ) {
		// 	replace spatie for '/'
		// }

		localStorageMod.set("userSettings", settings) // ToDo: check or input is not 'null';
			.then(function() {

				if ( settings.notification === true ) {

					pushMessage.confirm();
					// window.location.hash = "#personal/" + settings.city + "/" + settings.minPrice + "-" + settings.maxPrice;
					window.location.hash = "#droomhuis/" + settings.city;

				} else {

					// ToDo: render next template
					

				}

			});

	}
};
module.exports = userSettings;
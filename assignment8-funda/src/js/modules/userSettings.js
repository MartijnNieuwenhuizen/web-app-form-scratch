var htmlElements = require('../modules/htmlElements');
var template = require('../view/template');
var localStorageMod = require('./local-storage');
var pushMessage = require('./pushMessage');

var userSettings = {
	// check if there is relevant data in local storage
	checkLocalStorage: function() {

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

		template.render(htmlElements.settingsForm.innerHTML, content)
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
			city: document.querySelector('#city').value.toLowerCase(),
			radius: document.querySelector('#radius').value,
			minPrice: document.querySelector('#min-price').value,
			maxPrice: document.querySelector('#max-price').value,
			notification: document.querySelector('#notification').checked
		};

		localStorageMod.set("userSettings", settings)
			.then(function() {

				if ( Notification.permission === 'granted' ) {

					window.location.hash = "#thuis/" + settings.city;

				} else {

					pushMessage.confirm();

				}

			});

	}
};
module.exports = userSettings;
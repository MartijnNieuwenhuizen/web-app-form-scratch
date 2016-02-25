var dataFilter = require('../modules/dataFilter');
var funda = require('../modules/funda');
var localStorageMod = require('../modules/local-storage');

// Persoonlijker maken -> elke keer als openen
// Divice sort Uilezen -> Krijn
var pushMessage = {
	
	confirm: function() {
		
		if ( Notification.permission !== 'granted' ) {
				
			Notification.requestPermission();

		} else {

			var content = {
				title: "Gelukt",
				body: "Bekijk hier het volledige aanbod",
				icon: "../img/funda-logo.png",
				link: "http://www.funda.nl"
			}
			this.showNotification(content);

		}

	},

	showNotification: function(content) {

		var _content = content;

		var notification = new Notification(_content.title, {
		  icon: _content.icon,
		  body: _content.body
		});

		notification.onclick = function() {

			if ( _content.link != null ) {

				window.open(_content.link);

			} else {

				notification.close();

			}
		  
		};

	},

	// ToDo: Push Message Stylen!!!!!!!!!!!!!!!!!!!!!!

	pushNewHouses: function() {

		funda.returnNewHouses()
			.then(function(data) {

				if ( data.length ) {

					// get local storage title of city
					localStorageMod.get('userSettings')
					.then(function(userSettings) {

						var _userSettings = userSettings;

						var totalNewHouses = data.length;
						var content = {
							body: "zie meer!",
							icon: data[0].Foto,
							link: "/#droomhuis-vandaag/" + _userSettings.city
						};
						if ( data.length > 1 ) {
							content.title = "Er zijn vandaag " + data.length + " nieuwe mogelijke droomhuizen toegevoegd";
						} else {
							content.title = "Er is vandaag 1 nieuw mogelijk droomhuis toegevoegd";
						}

						pushMessage.showNotification(content);

					});

				} else {

					var content = {
						title: "Helaas",
						body: "Er zijn vandaag geen niewe droomhuizen toegevoegd",
						icon: "../img/funda.png",
						link: null
					};

					pushMessage.showNotification(content);

				}

			});

	}
};

module.exports = pushMessage
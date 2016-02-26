var dataFilter = require('../modules/dataFilter');
var funda = require('../modules/funda');
var localStorageMod = require('../modules/local-storage');

var pushMessage = {
	
	confirm: function() {
				
		new Promise(function(resolve, reject) {

			Notification.requestPermission();
			return resolve();	

		}).then(function() {

			var content = {
				title: "Gelukt",
				body: "Elke dag krijgt u een push notificatie met passende huizen die zijn toegevoegd terwijl u sliep ",
				icon: "../img/funda-logo.png",
				link: null
			}
			this.showNotification(content);
			window.location.hash = "#thuis/" + settings.city;

		});


	},

	showNotification: function(content) {

		var _content = content;

		var notification = new Notification(_content.title, {
		  icon: _content.icon,
		  body: _content.body
		});

		notification.onclick = function() {

			if ( _content.link != null ) {

				window.location.hash = '#thuis-vandaag/:city';

			} else {

				notification.close();

			}
		  
		};

	},

	pushNewHouses: function() {

		funda.returnNewHouses()
			.then(function(data) {

				if ( data.length ) {

					localStorageMod.get('userSettings')
					.then(function(userSettings) {

						var _userSettings = userSettings;

						var totalNewHouses = data.length;
						var content = {
							body: "zie meer!",
							icon: data[0].Foto,
							link: "/funda/#thuis-vandaag/" + _userSettings.city
						};
						if ( data.length > 1 ) {
							content.title = "Er zijn vandaag " + data.length + " mogelijke huizen toegevoegd in " + _userSettings.city;
						} else {
							content.title = "Er is vandaag 1 mogelijk thuis toegevoegd in " + _userSettings.city;
						}

						pushMessage.showNotification(content);

					});

				} else {

					var content = {
						title: "Helaas",
						body: "Er zijn vandaag geen niewe huizen toegevoegd",
						icon: "../img/funda.png",
						link: null
					};

					pushMessage.showNotification(content);

				}

			});

	}
};

module.exports = pushMessage
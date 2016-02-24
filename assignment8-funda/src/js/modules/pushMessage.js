var dataFilter = require('../modules/dataFilter');
var funda = require('../modules/funda');

// Persoonlijker maken -> elke keer als openen
// Divice sort Uilezen -> Krijn
var pushMessage = {
	// allow pushMesages in Chrome
	confirm: function() {
		
		if ( Notification.permission !== 'granted' ) {
				
			Notification.requestPermission();

		} else {

			content = {
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
		  
		  window.open(_content.link);
		  
		};

	},

	pushNewHouses: function() {

		funda.returnData()
			.then(dataFilter.devideHouses)
			.then(function(response) {
				console.log(response);
			})

	}
};

module.exports = pushMessage
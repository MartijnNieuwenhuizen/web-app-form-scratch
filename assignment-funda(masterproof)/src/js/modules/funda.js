var pushMessage = require('./pushMessage');

var funda = {
	apiCall: function(url) {

		return new Promise(function(resolve, reject) { // Resolve = .then / Reject = .catch;

			var request = new XMLHttpRequest();

			request.onloadstart = function() {

				console.log("START");
				// Isert Spinner if nessasery

			}
			request.onloadend = function(response) {

				// put data in the resolve of the promise
				resolve(request.response);

				console.log("LOADED");

			}

			request.onerror = reject;

			request.open('GET', url, true);
			request.send();

		});

	},

	connect: function() {

		url = {
			BaseUrl: "http://funda.kyrandia.nl/feeds/Aanbod.svc",
			key: "e2d60e885b8742d4b0648300e3703bd7",
			example: "/?type=koop&zo=/amsterdam/west/&page=1&pagesize=25"

		}

		var apiUrl = url.BaseUrl + "/json/" + url.key + url.example;

		this.apiCall(apiUrl)
			// Resolve
			.then(function(response) {

				var rawData = JSON.parse(response);
				pushMessage.init();

			})				
			// Reject
			.catch(function(err) {

				console.dir("Error:", err);

			});

	}
};

module.exports = funda;
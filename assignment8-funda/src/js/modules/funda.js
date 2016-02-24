var pushMessage = require('./pushMessage');
var htmlElements = require('./htmlElements');
var localStorageMod = require('./local-storage');
var dataFilter = require('./dataFilter');
var template = require('../view/template');

var funda = {
	// The call to the API
	APICall: function(url) {

		return new Promise(function(resolve, reject) { // Resolve = .then / Reject = .catch;

			var request = new XMLHttpRequest();

			request.onloadstart = function() {

				// Isert Spinner

			}
			request.onloadend = function(response) {

				// put data in the resolve of the promise
				resolve(request.response);

			}

			request.onerror = reject;

			request.open('GET', url, true);
			request.send();

		});

	},
	// Create api url
	APIUrl: function(settings) {

		var apiUrl;

		if ( settings ) {

			var _settings = settings;

			url = {
				BaseUrl: "http://funda.kyrandia.nl/feeds/Aanbod.svc",
				key: "e2d60e885b8742d4b0648300e3703bd7",
				type: "type=koop",
				city: _settings.city,
				radius: _settings.radius,
				minPrice: _settings.minPrice,
				maxPrice: _settings.maxPrice,
				pageNumber: "&page=1",
				pageSize: "&pagesize=25",
				new: _settings.new
			}

			if ( _settings.new ) {

				url.new = _settings.new;
				return apiUrl = url.BaseUrl + "/json/" + url.key + "/?" + url.type + "&zo=/" + url.city + "/+" + url.radius + "km/" + url.minPrice + "-" + url.maxPrice + "/" + url.new;

			} else {

				return apiUrl = url.BaseUrl + "/json/" + url.key + "/?" + url.type + "&zo=/" + url.city + "/+" + url.radius + "km/" + + url.minPrice + "-" + url.maxPrice + "/" + url.pageNumber + url.pageSize;

			};

		} else {

			userSettings.checkLocalStorage();

		};

	},
	// handle Data
	returnAllData: function() {

		return new Promise(function(resolve, reject) {

			// retreve userSettings
			var rawData = localStorageMod.get("userSettings")
				.then(funda.APIUrl)
				.then(funda.APICall)
				.then(function(data) {

					rawData = JSON.parse(data);	
					if ( rawData.TotaalAantalObjecten === 0) { return false; }

					resolve(rawData);

				})
				.catch(function(err) {
					console.error((err.stack) ? err.stack : err);
				});

		});

	},

	returnNewHouses: function() {

		return new Promise(function(resolve, reject) {

			var data = funda.returnAllData()
				.then(dataFilter.filterNewHouses)
				.then(function(filteredData) {

					resolve(filteredData);

				});

		});

	},

	returnAllHouses: function() {

		return new Promise(function(resolve, reject) {

			var data = funda.returnAllData()
				.then(dataFilter.returnAllHouses)
				.then(function(filteredData) {

					resolve(filteredData);

				});

		});

	}
};

module.exports = funda;
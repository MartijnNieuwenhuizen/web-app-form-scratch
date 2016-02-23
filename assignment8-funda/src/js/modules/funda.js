var pushMessage = require('./pushMessage');
var htmlElements = require('./htmlElements');
var localStorageMod = require('./local-storage');
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
				minPrice: _settings.minPrice,
				maxPrice: _settings.maxPrice,
				radius: _settings.radius,
				pageNumber: "&page=1",
				pageSize: "&pagesize=25",
				new: _settings.new
			}

			if ( _settings.new ) {

				url.new = _settings.new;
				return apiUrl = url.BaseUrl + "/json/" + url.key + "/?" + url.type + "&zo=/" + url.city + "/" + url.minPrice + "-" + url.maxPrice + "/" + url.new;

			} else {

				return apiUrl = url.BaseUrl + "/json/" + url.key + "/?" + url.type + "&zo=/" + url.city + "/" + url.minPrice + "-" + url.maxPrice + "/" + url.pageNumber + url.pageSize;

			};

		} else {

			userSettings.checkLocalStorage();

		};

	},
	// Retreve data from API
	getData: function(settings) {
		// get api url
		var apiUrl = funda.APIUrl(settings);
		// make api call
		funda.APICall(apiUrl)
			.then(function(response) {
				// store data
				var rawData = JSON.parse(response);
				// show data of houses
				funda.showHouses(rawData);

			})	
			.catch(function(err) {

				console.log("Error:", err);

			});

	},
	// handle Data
	handleData: function(data) {

		// retreve userSettings
		localStorageMod.get("userSettings")
			.then(function(resolve) {
				
				funda.getData(resolve);

			});

	},
	// show the matching houses
	showHouses: function(data) {

		template.render(htmlElements.houseList.innerHTML, data);

	},
	// Check houses added today
	checkHousesAddedToday: function() {

		localStorageMod.get("userSettings")
			.then(function(resolve) {

				// add the key: new to the obj
				var settings = resolve;
				settings.new = "1-dag";
				
				funda.getData(settings);

			});

	}
};

module.exports = funda;
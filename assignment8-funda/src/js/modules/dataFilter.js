var localStorageMod = require('../modules/local-storage');

var dataFilter = {

	// ToDo: api url part newest first instead of this? Then there is also paginering :)

	devideHouses: function(data) {

		return new Promise(function(resolve, reject) {

			var _data = data;
			var houseData = _data.Objects;
			var addedToday = [];
			var notAddedToday = [];

			_.filter(houseData, function(matched) {

				if ( matched.AangebodenSindsTekst === "Vandaag" ) {

					matched.today = true;
					addedToday.push(matched);

				} else {

					notAddedToday.push(matched);		    	

				};
			   
			});

			var cobinedData = {
				data: _data,
				addedToday: addedToday,
				notAddedToday: notAddedToday
			}

			resolve(cobinedData);

		});

	},

	filterNewHouses: function(data) {

		return new Promise(function(resolve, reject) {

			var _data = data;
			var houseData = _data.Objects;
			var addedToday = [];

			_.filter(houseData, function(matched) {

				if ( matched.AangebodenSindsTekst === "Vandaag" ) {

					matched.today = true;
					addedToday.push(matched);

				}
			   
			});

			resolve(addedToday);

		});

	},

	combineHousesData: function(combinedData) {

		var _combinedData = combinedData;
		var _data = _combinedData.data;
		var _addedToday = _combinedData.addedToday;
		var _notAddedToday = _combinedData.notAddedToday;

		return new Promise(function(resolve, reject) {

			localStorageMod.get('userSettings')
			.then(function(userSettings) {
				
				var _userSettings = userSettings;

				var meta = {
					city: _userSettings.city,
					budget: "€" + _userSettings.minPrice + " - €" + _userSettings.maxPrice,
					total: _data.TotaalAantalObjecten,
					totalToday: _addedToday.length,
				}

				var allHouses = _addedToday.concat(_notAddedToday);

				var content = {
					meta: meta,
					houses: allHouses
				}

				resolve(content);

			});

		});

	},

	returnAllHouses: function(data) {

		return new Promise(function(resolve, reject) {

			dataFilter.devideHouses(data)
				.then(dataFilter.combineHousesData)
				.then(function(combinedData) {

					console.log(combinedData);
					
					resolve(combinedData);

				});

		});

	}
};

module.exports = dataFilter;
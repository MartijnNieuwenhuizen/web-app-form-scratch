var htmlElements = require('./htmlElements');
var funda = require('./funda');
var template = require('../view/template');

var dataFilter = {
	devideHouses: function(data) {

		var _data = data;
		var houseData = data.Objects;
		var addedToday = [];
		var notAddedToday = [];

		_.filter(houseData, function(matched) {

			if( matched.AangebodenSindsTekst === "Vandaag" ) {

				matched.today = true;
				addedToday.push(matched);

			} else {

				notAddedToday.push(matched);		    	

			}
		   
		});

		return dataFilter.combineData(_data, addedToday, notAddedToday);

	},
	combineData: function(data, addedToday, notAddedToday) {

		var _data = data;

		var meta = {
			total: _data.TotaalAantalObjecten,
			totalToday: addedToday.length,
		}

		var allHouses = addedToday.concat(notAddedToday);

		var content = {
			meta: meta,
			houses: allHouses
		}

		// template.render(htmlElements.houseList.innerHTML, content);
		return content;

	}
};

// template.render(htmlElements.houseList.innerHTML, data);

module.exports = dataFilter;
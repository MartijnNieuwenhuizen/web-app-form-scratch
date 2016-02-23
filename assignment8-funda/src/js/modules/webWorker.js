var funda = require('./funda');

var webWorker = {
	init: function() {

		funda.checkHousesAddedToday();

	}
};

module.exports = webWorker;
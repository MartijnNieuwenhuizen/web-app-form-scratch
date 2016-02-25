var localStorageMod = require('./local-storage');
var pushMessage = require('./pushMessage');

var firstVisitToday = {
	check: function() {

		// Date from: http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth() +1;
		var yyyy = date.getFullYear();

		var today = mm +'/' + dd + '/' + yyyy;

		localStorageMod.get('today')
			.then(function(localStorageDate) {
				
				if ( localStorageDate ) {

					if ( today > localStorageDate ) {

						pushMessage.pushNewHouses();

					}
							
					pushMessage.pushNewHouses(); // for development purposes
					firstVisitToday.setNewDate(today);


				} else {

					firstVisitToday.setNewDate(today);

				}

			})

	},
	setNewDate: function(today) {

		return localStorageMod.set('today', today);

	}
};

module.exports = firstVisitToday;
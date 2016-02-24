var localStorageMod = require('./local-storage');
var pushMessage = require('./pushMessage');

var firstVisitToday = {
	check: function() {

		// Date from: http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth() +1;
		var yyyy = date.getFullYear();

		// var today = {
		// 	mm: mm,
		// 	dd: dd,
		// 	yyyy: yyyy,
		// }
		var today = mm +'/' + dd + '/' + yyyy;

		localStorageMod.get('today')
			.then(function(resolve) {
				
				if ( resolve ) {

					var localStorageDate = resolve;

					if ( today > localStorageDate ) {

						firstVisitToday.setNewDate(today);
						pushMessage.getNewHouses();

					} else if ( today === localStorageDate ){

						console.log("already fisited today");
						pushMessage.getNewHouses();

					} else {

						firstVisitToday.setNewDate(today);

					}

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
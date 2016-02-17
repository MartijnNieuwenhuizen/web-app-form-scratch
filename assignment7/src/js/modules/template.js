var htmlElements = require('./html-elements');
var gesture = require('./gesture');

// Render the templates
var template = {
	
	// ToDo: Functionele animatie: let content fade-in/out
	render: function(data, htmlTemplate) {

		// Render template with handlebars
		var template = Handlebars.compile(htmlTemplate);
		var html = template(data);
		htmlElements.main.innerHTML = html;

		this.detail();

	},
	detail: function() {

		// add the page detail function
		var songs = document.querySelectorAll('.songs');

		// If there are songs shown
		if ( songs.length ) {

			// Cody by Robin van Nispen && Casper boutes
			// call leent de methode van de array: de forEach loop
			Array.prototype.forEach.call(songs, function(song) {

				song.addEventListener('click', setId, true);

				function setId() {

					var newId = this.id;
					window.location.hash = '/:id' + newId;

				}

			});

		}

	},
	showDetail: function(data) {

		if ( data ) {
			
			var currentData = data;

		} else {

			if ( localStorage.length ) {

				var localData = localStorage.getItem('localData');
				var currentData = JSON.parse(localData);
			}

		}

		var matchingData = [];
		var hashId = window.location.hash.slice(5);

		_.filter(currentData, function(singleSong) {

			if ( singleSong.id == hashId ) {
				matchingData.push(singleSong);
			}

	    });
		template.render(matchingData[0], htmlElements.detail.innerHTML);

		gesture.nextSong(currentData);

	}
};
module.exports = template;
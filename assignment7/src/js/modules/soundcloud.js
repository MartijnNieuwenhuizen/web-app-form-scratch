var htmlElements = require('./html-elements');	
var template = require('../view/template');
var spinner = require('./spinner');

var soundCloud = {
	request: function(url) {

		return new Promise(function(resolve, reject) { // Resolve = .then && Reject = .catch;

			var request = new XMLHttpRequest();

			request.onloadstart = function() {

				spinner.start();

			}
			request.onloadend = function(response) {

				var data = request.response;
				resolve(data);					

			}

			request.onerror = reject;

			request.open('GET', url, true);
			request.send();

		});

	},

	getData: function(term, title) {

		var sc = {
			BaseUrl: "https://api.soundcloud.com",
			id: 'client_id=2fda30f3c5a939525422f47c385564ae',
			tracks: "tracks?",
			users: "users?client_id=2fda30f3c5a939525422f47c385564ae",
			limit: 'limit=100'
		}

		if ( term ) {

			var soundCloudUrl = sc.BaseUrl + '/' + sc.tracks + sc.id + '&q=' + '=' + term + '&' + sc.limit;				

		} else {

			var soundCloudUrl = sc.BaseUrl + '/' + sc.tracks + sc.id + '&' + sc.limit;

		}

		this.request(soundCloudUrl)	
			.then(function(response) {

				window.rawData = JSON.parse(response);

				var songString = JSON.stringify(window.rawData);
				localStorage.setItem('localData', songString);


				if ( window.rawData.length ) {

					if ( title == 'search-songs' ) {

						template.render(window.rawData, htmlElements.searchSongs.innerHTML);

					} else {

						template.render(window.rawData, htmlElements.songs.innerHTML);

					}


				} else {
					
					var content = {
						title: "Sorry,",
						message: "no Search results"
					}
					template.render(content, htmlElements.error.innerHTML);

				}

			})
			// Reject
			.catch(function(err) {

				console.dir(err);
				var content = {
					title: "Sorry, unable to make a connection with SoundCloud"
				}
				template.render(content, htmlElements.error.innerHTML);

			});

	}
}
module.exports = soundCloud;
(function() {
	'use strict';
	
	var htmlElements = {
		main: document.querySelector('main'),
		songs: document.querySelector('#songs'),
		searchform: document.querySelector('#search'),
		error: document.querySelector('#error'),
		loading: document.querySelector('#loading')
	}

	var app = {
		init: function() {

			// call the routes.init
			routes.init();

		}
	}

	var routes = {
		init: function() {

			// routers for all the elements on the page
			routie({
				// if the url has no hash, set hash to search
				'': function() {
					routie('search');
				},
				'search': function() {
			    	// template.render(null, htmlElements.searchform.innerHTML);
			    	search.action();
			    },
				'all': function() {
			    	soundCloud.getData();
			    },
			    '*': function() {
			    	var content = {
			    		title: "404",
			    		message: "Sorry page not found"
			    	}
			    	template.render(content, htmlElements.error.innerHTML);
			    }
			});

		}
	}

	var soundCloud = {
		request: function(url) {

			return new Promise(function(resolve, reject) { // Resolve = .then && Reject = .catch;

				var request = new XMLHttpRequest();

				request.onloadstart = function() {

					// if more than 250ms
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

		getData: function(term) {

			var sc = {
				BaseUrl: "https://api.soundcloud.com",
				id: 'client_id=2fda30f3c5a939525422f47c385564ae',
				tracks: "tracks?",
				users: "users?client_id=2fda30f3c5a939525422f47c385564ae",
				limit: 'limit=200'
			}

			if ( term ) {

				var soundCloudUrl = sc.BaseUrl + '/' + sc.tracks + sc.id + '&q=' + '=' + term + '&' + sc.limit;				

			} else {

				var soundCloudUrl = sc.BaseUrl + '/' + sc.tracks + sc.id + '&' + sc.limit;

			}

			this.request(soundCloudUrl)	
				.then(function(response) {

					console.log("load content");
					var rawData = JSON.parse(response);

					if ( rawData.length ) {

						template.render(rawData, htmlElements.songs.innerHTML);

					} else {
						
						var content = {
							title: "Sorry, no Search results"
						}
						template.render(content, htmlElements.error.innerHTML);

					}

				})
				// Reject
				.catch(function(err) {

					console.log("error");

				});

		}
	}

	// Render the templates
	var template = {
		
		// ToDo: Functionele animatie: let content fade-in/out

		render: function(data, htmlTemplate) {

			// Render template with handlebars
			var template = Handlebars.compile(htmlTemplate);
			var html = template(data);
			htmlElements.main.innerHTML = html;

			this.detail();

			spinner.stop();

		},
		detail: function() {

			// add the page detail function
			var songs = document.querySelectorAll('.songs');

			// If there are songs shown
			if ( songs.length ) {

				// Cody by Robin van Nispen && Casper boutes
				// call leent de methode van de array: de forEach loop
				Array.prototype.forEach.call(songs, function(song) {

					song.onclick = function() {
						
						// Show detail items of this item on the page
						htmlElements.main.innerHTML = this.innerHTML;

					}

				});

			}

		}
	};

	var search = {
		action: function() {

			template.render(null, htmlElements.searchform.innerHTML);

			var submitButton = document.querySelector('#submit');
			submitButton.onclick = function() {
			
				var searchValue = document.querySelector('#song').value.toLowerCase();
				soundCloud.getData(searchValue);

			}

		}

	};

	var spinner = {
		start: function() {

			template.render(null, htmlElements.loading.innerHTML);

		},
		stop: function() {

			// console.log("Stop Spinner");

		}
	};

	// start the main app
	app.init();

})();



// More To Do: 
// 				Add a gesture
// 				Visulize the flow
// 				Cut your code into modules
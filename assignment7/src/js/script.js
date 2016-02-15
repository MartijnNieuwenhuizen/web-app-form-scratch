(function() {
	'use strict';
	
	var htmlElements = {
		main: document.querySelector('main'),
		songs: document.querySelector('#songs'),
		searchform: document.querySelector('#search'),
		noSearchResults: document.querySelector('#no-restult'),
		error: document.querySelector('#error')
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
			    	var title = "Search";
			    	soundCloud.action(title);
			    },
				'all': function() {
			    	var title = "All songs";
			    	soundCloud.action(title);
			    },
			    '*': function() {
			    	template.render(null, htmlElements.error.innerHTML);
			    }
			});

		}
	}

	var soundCloud = {
		url: function(title) {

			var sc = {
				BaseUrl: "https://api.soundcloud.com",
				tracks: "tracks?client_id=2fda30f3c5a939525422f47c385564ae",
				users: "users?client_id=2fda30f3c5a939525422f47c385564ae"
			}
			var soundCloudUrl = sc.BaseUrl + '/' + sc.tracks;
			console.log(soundCloudUrl);
			return soundCloudUrl;

		},
		getData: function(url) {

			return new Promise(function(resolve, reject) {

				var request = new XMLHttpRequest();

				request.onloadstart = function() {

					// showLoader();
					console.log("started");

				}
				request.onloadend = function(response) {
				
					// hideLoader();
					// resolve(response);
					console.log("ended");

				}

				request.onerror = reject;

				request.open('GET', url, true);
				request.send();

				console.log(request);

			});

		},
		action: function(title) {

			this.getData('https://api.soundcloud.com/tracks?client_id=2fda30f3c5a939525422f47c385564ae');

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

		},
		// ToDo: Make this one function
		renderForm: function(rawData) {

			// render the searchform template
			this.render(rawData, htmlElements.searchform.innerHTML);
			// call the search
			search.action(rawData);

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
	}

	var search = {
		action: function(rawData) {

			var submitButton = document.querySelector('#submit');
			submitButton.onclick = function() {
			
				var searchValue = document.querySelector('#song').value;

				var matchingData = [];

				_.filter(rawData, function(matched) {

					// if the title or genre of a object matches
				    if( matched.title && matched.title.match(searchValue) || matched.genre && matched.genre.match(searchValue)) {

				    	// push this data in the matchingdata array
						matchingData.push(matched);

				    }
				   
				});   

				// if there are search results
				if( matchingData.length ) {

					template.render(matchingData, htmlElements.songs.innerHTML);	

				}
				// if there are no search results
				else {

					var message = {
						title: "no search results match"
					}
				
					template.render(message, htmlElements.noSearchResults.innerHTML);						

				}

			}

		}

	}

	// start the main app
	app.init();

})();



// More To Do: 
// 				Add a gesture
// 				Visulize the flow
// 				Cut your code into modules
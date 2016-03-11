// (function() {
// 	'use strict';
	
// 	var htmlElements = {
// 		main: document.querySelector('main'),
// 		songs: document.querySelector('#songs'),
// 		searchform: document.querySelector('#search'),
// 		error: document.querySelector('#error'),
// 		loading: document.querySelector('#loading'),
// 		detail: document.querySelector('#detail'),
// 		songDetail: document.querySelector('.song-detail'),
// 		searchSongs: document.querySelector('#search-songs')
// 	}

// 	// Needed global vars
// 	var rawData;

// 	var app = {
// 		init: function() {

// 			// call the routes.init
// 			routes.init();

// 		}
// 	}

// 	var routes = {
// 		init: function() {

// 			// routers for all the elements on the page
// 			routie({
// 				// if the url has no hash, set hash to search
// 				'': function() {
// 					routie('search');
// 				},
// 				'search': function() {
// 			    	search.action();
// 			    },
// 				'latest': function() {
// 			    	soundCloud.getData();
// 			    },
// 			    '/:id': function() {
// 			    	template.showDetail(rawData);
// 			    },
// 			    '*': function() {
// 			    	var content = {
// 			    		title: "404",
// 			    		message: "Sorry page not found"
// 			    	}
// 			    	template.render(content, htmlElements.error.innerHTML);
// 			    }
// 			});

// 		}
// 	}

// 	var soundCloud = {
// 		request: function(url) {

// 			return new Promise(function(resolve, reject) { // Resolve = .then && Reject = .catch;

// 				var request = new XMLHttpRequest();

// 				request.onloadstart = function() {

// 					// if more than 250ms
// 					spinner.start();

// 				}
// 				request.onloadend = function(response) {

// 					var data = request.response;
// 					resolve(data);					

// 				}

// 				request.onerror = reject;

// 				request.open('GET', url, true);
// 				request.send();

// 			});

// 		},

// 		getData: function(term, title) {

// 			var sc = {
// 				BaseUrl: "https://api.soundcloud.com",
// 				id: 'client_id=2fda30f3c5a939525422f47c385564ae',
// 				tracks: "tracks?",
// 				users: "users?client_id=2fda30f3c5a939525422f47c385564ae",
// 				limit: 'limit=100'
// 			}

// 			if ( term ) {

// 				var soundCloudUrl = sc.BaseUrl + '/' + sc.tracks + sc.id + '&q=' + '=' + term + '&' + sc.limit;				

// 			} else {

// 				var soundCloudUrl = sc.BaseUrl + '/' + sc.tracks + sc.id + '&' + sc.limit;

// 			}

// 			this.request(soundCloudUrl)	
// 				.then(function(response) {

// 					// console.log("load content");
// 					rawData = JSON.parse(response);

// 					var songString = JSON.stringify(rawData);
// 					localStorage.setItem('localData', songString);

// 					// }


// 					if ( rawData.length ) {

// 						if ( title == 'search-songs' ) {

// 							template.render(rawData, htmlElements.searchSongs.innerHTML);

// 						} else {

// 							template.render(rawData, htmlElements.songs.innerHTML);

// 						}


// 					} else {
						
// 						var content = {
// 							title: "Sorry,",
// 							message: "no Search results"
// 						}
// 						template.render(content, htmlElements.error.innerHTML);

// 					}

// 				})
// 				// Reject
// 				.catch(function(err) {

// 					console.dir(err);
// 					var content = {
// 						title: "Sorry, unable to make a connection with SoundCloud"
// 					}
// 					template.render(content, htmlElements.error.innerHTML);

// 				});

// 		}
// 	}

// 	// Render the templates
// 	var template = {
		
// 		// ToDo: Functionele animatie: let content fade-in/out
// 		render: function(data, htmlTemplate) {

// 			// Render template with handlebars
// 			var template = Handlebars.compile(htmlTemplate);
// 			var html = template(data);
// 			htmlElements.main.innerHTML = html;

// 			this.detail();
// 			spinner.stop();

// 		},
// 		detail: function() {

// 			// add the page detail function
// 			var songs = document.querySelectorAll('.songs');

// 			// If there are songs shown
// 			if ( songs.length ) {

// 				// Cody by Robin van Nispen && Casper boutes
// 				// call leent de methode van de array: de forEach loop
// 				Array.prototype.forEach.call(songs, function(song) {

// 					song.addEventListener('click', setId, true);

// 					function setId() {

// 						var newId = this.id;
// 						window.location.hash = '/:id' + newId;

// 					}

// 				});

// 			}

// 		},
// 		showDetail: function(data) {

// 			if ( data ) {
				
// 				var currentData = data;

// 			} else {

// 				if ( localStorage.length ) {

// 					var localData = localStorage.getItem('localData');
// 					var currentData = JSON.parse(localData);
// 				}

// 			}

// 			var matchingData = [];
// 			var hashId = window.location.hash.slice(5);

// 			_.filter(currentData, function(singleSong) {

// 				if ( singleSong.id == hashId ) {
// 					matchingData.push(singleSong);
// 				}

// 		    });
// 			template.render(matchingData[0], htmlElements.detail.innerHTML);

// 			gesture.nextSong(currentData);

// 		}
// 	};

// 	var search = {
// 		action: function() {

// 			template.render(null, htmlElements.searchform.innerHTML);

// 			var submitButton = document.querySelector('#submit');
// 			submitButton.onclick = function() {
			
// 				var searchValue = document.querySelector('#song').value.toLowerCase();
// 				soundCloud.getData(searchValue, 'search-songs');

// 			}

// 		}

// 	};

// 	var spinner = {
// 		start: function() {

// 			template.render(null, htmlElements.loading.innerHTML);

// 		},
// 		stop: function() {

// 			// console.log("Stop Spinner");

// 		}
// 	};

// 	var gesture = {
// 		nextSong: function(data) {

// 			var currentData = data;
// 			var songCount = 0;
// 			var cache = 0;
// 			var hashId = window.location.hash.slice(5);

// 			var matchingSong = _.find(currentData, function(num) { 
				
// 				songCount ++;

// 				if ( num.id == hashId ) {
					
// 					songCount --;
// 					cache = songCount;

// 				}

// 			});

// 			var swipe = new Hammer(htmlElements.main);

// 			swipe.on('swipeleft', function() {

// 				if ( data ) {
// 					cache ++;
// 					var nextSong = data[cache].id;
// 					window.location.hash = '/:id' + nextSong;
// 				}

// 				htmlElements.main.classList.add('left');

// 			});
// 			swipe.on('swiperight', function() {
				
// 				if ( data ) {
// 					cache --;
// 					var nextSong = data[cache].id;
// 					window.location.hash = '/:id' + nextSong;
// 				}

// 				htmlElements.main.classList.add('right');

// 			});
			
// 		}

// 	};

// 	// start the main app
// 	app.init();

// })();
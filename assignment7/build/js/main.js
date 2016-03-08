(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	'use strict';
	
	// Init Modules
	var routes = require('./routes/routes');

	var app = {
		init: function() {

			// call the routes.init
			routes.init();

		}
	}

	// start the main app
	app.init();

})();
},{"./routes/routes":7}],2:[function(require,module,exports){
var htmlElements = require('./html-elements');	

var gesture = {
	nextSong: function(data) {

		var currentData = data;
		var songCount = 0;
		var cache = 0;
		var hashId = window.location.hash.slice(5);

		var matchingSong = _.find(currentData, function(num) { 
			
			songCount ++;

			if ( num.id == hashId ) {
				
				songCount --;
				cache = songCount;

			}

		});

		var swipe = new Hammer(htmlElements.main);

		swipe.on('swipeleft', function() {

			if ( data ) {
				cache ++;
				var nextSong = data[cache].id;
				window.location.hash = '/:id' + nextSong;
			}

			htmlElements.main.classList.add('left');

			setTimeout(function() {
				htmlElements.main.classList.remove('left');
			},300);

		});
		swipe.on('swiperight', function() {
			
			if ( data ) {
				cache --;
				var nextSong = data[cache].id;
				window.location.hash = '/:id' + nextSong;
			}

			htmlElements.main.classList.add('right');
			
			setTimeout(function() {
				htmlElements.main.classList.remove('right');
			},300);

		});
		
	}

};
module.exports = gesture;
},{"./html-elements":3}],3:[function(require,module,exports){
var htmlElements = {
	main: document.querySelector('main'),
	songs: document.querySelector('#songs'),
	searchform: document.querySelector('#search'),
	error: document.querySelector('#error'),
	loading: document.querySelector('#loading'),
	detail: document.querySelector('#detail'),
	songDetail: document.querySelector('.song-detail'),
	searchSongs: document.querySelector('#search-songs')
}

module.exports = htmlElements;
},{}],4:[function(require,module,exports){
var htmlElements = require('./html-elements');	
var soundCloud = require('./soundcloud');
var template = require('../view/template');

var search = {
	action: function() {

		template.render(null, htmlElements.searchform.innerHTML);

		var submitButton = document.querySelector('#submit');
		submitButton.onclick = function() {
		
			var searchValue = document.querySelector('#song').value.toLowerCase();
			soundCloud.getData(searchValue, 'search-songs');

		}

	}

};
module.exports = search;
},{"../view/template":8,"./html-elements":3,"./soundcloud":5}],5:[function(require,module,exports){
var htmlElements = require('./html-elements');	
var template = require('../view/template');
var spinner = require('./spinner');

var soundCloud = {
	request: function(url) {
		// used the example of David den Toom
		return new Promise(function(resolve, reject) { // Resolve = .then / Reject = .catch;

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
			// Resolve
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
},{"../view/template":8,"./html-elements":3,"./spinner":6}],6:[function(require,module,exports){
var htmlElements = require('./html-elements');
var template = require('../view/template');

var spinner = {
	start: function() {
		
		template.render(null, htmlElements.loading.innerHTML);

	},
};
module.exports = spinner;
},{"../view/template":8,"./html-elements":3}],7:[function(require,module,exports){
var htmlElements = require('../modules/html-elements');	
var search = require('../modules/search');
var soundCloud = require('../modules/soundcloud');
var template = require('../view/template');

var routes = {
	init: function() {

		// routers for all the elements on the page
		routie({
			// if the url has no hash, set hash to search
			'': function() {
				routie('search');
			},
			'search': function() {
		    	search.action();
		    },
			'latest': function() {
		    	soundCloud.getData();
		    },
		    '/:id': function() {
	    		template.showDetail(window.rawData);
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

module.exports = routes;
},{"../modules/html-elements":3,"../modules/search":4,"../modules/soundcloud":5,"../view/template":8}],8:[function(require,module,exports){
var htmlElements = require('../modules/html-elements');
var gesture = require('../modules/gesture');

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
},{"../modules/gesture":2,"../modules/html-elements":3}]},{},[1])
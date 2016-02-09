// Add the iifi
(function() {
	'use strict';

	// init Templating
	var main = document.querySelector('main');
	var cityTemplate = document.querySelector('#city');
	var source = document.querySelector('#city');

	// Hide error template
	var errorTemplate = document.querySelector('#error');
	errorTemplate.classList.add('hide');

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
				'all': function() {
			    	var placeName = "All places";
			    	soundcloud.init(placeName);
			    },
			    'amsterdam': function() {
			    	var placeName = "Amsterdam";
			    	soundcloud.init(placeName);
			    },
			    'berlin': function() {
			    	var placeName = "Berlin";
			    	soundcloud.init(placeName);
			    },
			    'london': function() {
			    	var placeName = "London";
			    	soundcloud.init(placeName);
			    }
			});

		}
	}

	// var places = {
	// 	all: function() {

	// 		var placeName = "All places";
	// 		soundcloud.init(placeName);

	// 	},
	// 	amsterdam: function() {

	// 		var placeName = "Amsterdam";
	// 		soundcloud.init(placeName);

	// 	},
	// 	berlin: function() {

	// 		var placeName = "Berlin";
	// 		soundcloud.init(placeName);

	// 	},
	// 	london: function() {

	// 		var placeName = "London";
	// 		soundcloud.init(placeName);

	// 	}
	// }

	var soundcloud = {
		init: function(placeName) {

			// soundcloud url data
			var sc = {
				BaseUrl: "https://api.soundcloud.com",
				tracks: "tracks?client_id=2fda30f3c5a939525422f47c385564ae",
				users: "users?client_id=2fda30f3c5a939525422f47c385564ae"
			}

			nanoajax.ajax({url: sc.BaseUrl + '/' + sc.tracks}, function(amount, data) {
				
				// Get / Store data
				var data = JSON.parse(data);

				var templateContent = {
					placeName: placeName,
				    title: data[4].title,
				    imgUrl: data[4].artwork_url,
				    discription: data[4].discription,
				    genre: data[4].genre
				};

				template.init(templateContent);

			});

		}
	}

	var template = {
		init: function(templateContent) {

			var templateContent = templateContent;

			// Handlebars templateing
			var innerSource = source.innerHTML;
			var template = Handlebars.compile(innerSource);

			var context = {
				placeName: templateContent.placeName,
				title: templateContent.title,
				discription: templateContent.discription,
				genre: templateContent.genre
			}

			var html = template(context);

			// source.innerHTML = html;

			console.log(source);

		}
	}

	// start the main app
	app.init();

})();
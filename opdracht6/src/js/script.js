// Add the iifi
(function() {
	'use strict';

	// Get 'gobal' parts
	var main = document.querySelector('main');
	var source = document.querySelector('#city').innerHTML;
	var searchForm = document.querySelector('#search').innerHTML;
	var noResult = document.querySelector('#no-restult').innerHTML;

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
				// if the url has no hash, set hash to search
				'': function() {
					routie('search');
				},
				'search': function() {
			    	var title = "Search";
			    	soundCloud.init(title);
			    },
				'all': function() {
			    	var title = "All songs";
			    	soundCloud.init(title);
			    }
			});

		}
	}


	// make the function return the data
	var soundCloud = {
		init: function(title) {

			// soundcloud url data
			var sc = {
				BaseUrl: "https://api.soundcloud.com",
				tracks: "tracks?client_id=2fda30f3c5a939525422f47c385564ae",
				users: "users?client_id=2fda30f3c5a939525422f47c385564ae"
			}
			nanoajax.ajax({url: sc.BaseUrl + '/' + sc.tracks}, function(amount, data) {

				// store data
				var rawData = JSON.parse(data);

				if ( title === "Search" ) {

					template.renderForm(rawData, searchForm);

				}
				if ( title === "All songs" ) {

					template.render(rawData, source);

				}

			});

		}
	}

	var template = {
		render: function(data, htmlTemplate) {
			
			this.display(data, htmlTemplate);

		},
		renderForm: function(data, htmlTemplate) {

			this.display(data, htmlTemplate);
			search.handleSearch(data, htmlTemplate);

		},
		display: function(data, htmlTemplate) {

			var template = Handlebars.compile(htmlTemplate);
			var html = template(data);
			main.innerHTML = html;

		}
	}

	var search = {
		handleSearch: function(rawData, htmlTemplate) {

			var submit = document.querySelector('#submit');
			submit.onclick = function() {
			
				var searchText = document.querySelector('#song').value;

				var matchingData = [];

				var evens = _.filter(rawData, function(obj) {

				    if( obj.title && obj.title.match(searchText) || obj.genre && obj.genre.match(searchText)) {

						matchingData.push(obj);

				    }
				   
				 });   

				if( matchingData.length ) {

					template.render(matchingData, source);	

				}
				else {

					var message = {
						title: "no search results"
					}
				
					template.render(message, noResult, noResult);						

				}

			}

		}
	}

	// start the main app
	app.init();

})();
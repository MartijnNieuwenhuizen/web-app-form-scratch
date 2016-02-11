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

			window.onload = function() {
				routie('search');
			};

			// routers for all the elements on the page
			routie({
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

				// Get / Store data
				var rawData = JSON.parse(data);

				console.log(rawData);

				if ( title === "Search" ) {

					title = "Search";
					search.render(rawData, title);

				}
				if ( title === "All songs" ) {

					title = "All songs";
					template.render(rawData, source);

				}

			});

		}
	}

	var template = {
		render: function(data, id, beyond) {

			var template = Handlebars.compile(id);
			var html = template(data);
			main.innerHTML = html;

			if ( beyond === true ) {

				search.handleSearch(data, id);

			}

		}
	}

	var search = {
		render: function(rawData, title) {

			var beyond = true;
		
			template.render(rawData, searchForm, beyond);

		},
		handleSearch: function(rawData, title) {

			var submit = document.querySelector('#submit');
			submit.onclick = function() {
			
				var searchText = document.querySelector('#song').value;

				var dataDat = [];
				var matched = false;

				var filterData = _.filter(rawData, function(data) {

					var nessesaryData = [
						{
							title: data.title
						},
						{
							genre: data.genre
						}
					];

					var evens = _.filter(nessesaryData, function(obj) {
					    
					    if( obj.title ) {
					    	
					    	var matchTitle = obj.title.match(searchText);
					    	return matchTitle;
					    	// USE TrackId instead of the title? :)

					    }
					    if( obj.genre ) {
					    	
					    	var matchGenre = obj.genre.match(searchText);
					    	return matchGenre;

					    }
					    
					});

					// Robbert
					if(evens.length > 0) {
						console.dir("match " + evens[0])
						dataDat.push(evens[0])
						matched = true;
					}
					else {
						console.log("no match")
					}

					if ( matched === true ) {

						template.render(dataDat, source);
						console.log(matched);

					} else {

						var message = {
							title: "no search results"
						}
						console.log(matched);
						template.render(message, noResult);						

					}


				});

			}

		}
	}

	// start the main app
	app.init();

})();
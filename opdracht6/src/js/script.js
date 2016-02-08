var sc = {
	BaseUrl: "https://api.soundcloud.com",
	tracks: "tracks?client_id=2fda30f3c5a939525422f47c385564ae",
	users: "users?client_id=2fda30f3c5a939525422f47c385564ae"
}



nanoajax.ajax({url: sc.BaseUrl + '/' + sc.tracks}, function(amount, data) {
	
	// console.log(data, id);
	var _data = JSON.parse(data);

	console.log(_data[45].title);

	var parg = document.querySelector('main p');
	// console.log(parg);
	var title = _data[45].title;
	parg.innerHTML = title;

});



// SDK
// SC.initialize({
// 	client_id: '8b70bc40bde9cefe74fd08bb12bac86c',
// 	max-
// });

// SC.get('/tracks', function(tracks){
// 	console.log(tracks);
// });

// SC.get('/tracks', { genres: 'dance' }, function(tracks) {
// 	console.dir(tracks);
// });



// // Add the iifi
// (function() {
// 	'use strict';

// 	var app = {
// 		init: function() {

// 			// call the routes.init
// 			twitter.init();

// 		}
// 	}
	
// 	// naming idea from Rover van Nispen
// 	var twitter = {
// 		init: function() {

// 			console.log("Foo");

// 		}
// 	}

// 	var sections = {
// 		toggle: function(e) {

// 			// Get the hash of the current url after click
// 			// var url = window.location.hash; (this is the old syntax, now useing the event);
// 			var url = e.currentTarget.location.hash;

// 			// If the url has a hash
// 			if ( url ) {

// 				//NOTE: Got the templateing idea from Dylan Vens

// 				// Get the template that matches the url
// 				var matchingTemplate = document.querySelector(url);

// 				// If this templates exists
// 				if ( matchingTemplate ) {

// 					// Get the content from the matching template and use that content in the main html
// 					main.innerHTML = matchingTemplate.innerHTML;

// 				} else {

// 					// If the template doesn't exists: load the error template
// 					main.innerHTML = document.querySelector('#error').innerHTML;

// 				}

// 			} else {
				
// 				// If the url has no hash(so this is home) -> set the hash to start
// 				window.location.hash = '#home';

// 			} 

// 		}
// 	}

// 	// start the main app
// 	app.init();

// })();